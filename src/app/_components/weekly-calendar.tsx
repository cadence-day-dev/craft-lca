"use client";

interface TimesliceData {
  id?: string;
  start_time: string;
  end_time?: string;
  duration_seconds?: number;
  note?: string;
  activity_id?: string;
}

interface WeeklyCalendarProps {
  timeslices: TimesliceData[];
}

export default function WeeklyCalendar({ timeslices }: WeeklyCalendarProps) {
  // Filter timeslices to only include specific activity ID
  const octoberTimeslices = timeslices.filter(timeslice => {
    return timeslice.activity_id === '15444261-b618-417a-9cf2-77f4744a92d4';
  });
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return `${hour}:${minute.toString().padStart(2, '0')}`;
  });

  // Generate week days dynamically from October data - limit to 5 days
  const getWeekDays = () => {
    if (!octoberTimeslices || octoberTimeslices.length === 0) {
      return [
        { label: 'SUN 6/1', date: '2024-06-01' },
        { label: 'MON 6/2', date: '2024-06-02' },
        { label: 'TUE 6/3', date: '2024-06-03' },
        { label: 'WED 6/4', date: '2024-06-04' },
        { label: 'THU 6/5', date: '2024-06-05' }
      ];
    }

    // Find date range from October timeslices
    const dates = octoberTimeslices.map(ts => {
      try {
        return new Date(ts.start_time).toISOString().split('T')[0];
      } catch {
        return null;
      }
    }).filter((date): date is string => date !== null);
    
    const uniqueDates = [...new Set(dates)].sort().slice(0, 5); // Limit to 5 days
    
    return uniqueDates.map((dateStr) => {
      const date = new Date(dateStr + 'T12:00:00'); // Avoid timezone issues
      const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const dayName = dayNames[date.getDay()];
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      return {
        label: `${dayName} ${month}/${day}`,
        date: dateStr
      };
    });
  };

  const weekDays = getWeekDays();

  // Debug output
  console.log('All timeslices:', timeslices?.length || 0);
  console.log('October timeslices:', octoberTimeslices?.length || 0);
  console.log('Generated week days:', weekDays);

  const analyzePatterns = () => {
    const activityPatterns = new Map<string, number>();
    const timeSlotPatterns = new Map<string, number>();
    const dayTimePatterns = new Map<string, number>();

    octoberTimeslices.forEach(timeslice => {
      const startDate = new Date(timeslice.start_time);
      const timeKey = `${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, '0')}`;
      const dayOfWeek = startDate.getDay();
      const dayTimeKey = `${dayOfWeek}-${timeKey}`;
      
      const activityKey = timeslice.activity_id || timeslice.note || 'unnamed';
      
      activityPatterns.set(activityKey, (activityPatterns.get(activityKey) || 0) + 1);
      timeSlotPatterns.set(timeKey, (timeSlotPatterns.get(timeKey) || 0) + 1);
      dayTimePatterns.set(dayTimeKey, (dayTimePatterns.get(dayTimeKey) || 0) + 1);
    });

    return { activityPatterns, timeSlotPatterns, dayTimePatterns };
  };

  const { activityPatterns, timeSlotPatterns, dayTimePatterns } = analyzePatterns();

  const getTimeslicesForSlot = (dayDate: string, timeSlot: string) => {
    const [slotHour, slotMinute] = timeSlot.split(':').map(Number);
    const slotStartMinutes = slotHour * 60 + slotMinute;
    const slotEndMinutes = slotStartMinutes + 30;

    return octoberTimeslices.filter(timeslice => {
      const startDate = new Date(timeslice.start_time);
      const startDateStr = startDate.toISOString().split('T')[0];
      
      // Check if dates match
      if (startDateStr !== dayDate) {
        return false;
      }

      const startHour = startDate.getHours();
      const startMinute = startDate.getMinutes();
      const startTotalMinutes = startHour * 60 + startMinute;

      // Calculate end time
      const endDate = timeslice.end_time ? 
        new Date(timeslice.end_time) : 
        new Date(startDate.getTime() + (timeslice.duration_seconds ? timeslice.duration_seconds * 1000 : 30 * 60 * 1000));
      
      const endHour = endDate.getHours();
      const endMinute = endDate.getMinutes();
      const endTotalMinutes = endHour * 60 + endMinute;

      // Check if timeslice overlaps with this slot
      return startTotalMinutes < slotEndMinutes && endTotalMinutes > slotStartMinutes;
    });
  };

  const getRepeatabilityLevel = (timeslice: TimesliceData) => {
    const activityKey = timeslice.activity_id || timeslice.note || 'unnamed';
    const startDate = new Date(timeslice.start_time);
    const timeKey = `${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    const dayOfWeek = startDate.getDay();
    const dayTimeKey = `${dayOfWeek}-${timeKey}`;

    const activityCount = activityPatterns.get(activityKey) || 1;
    const timeSlotCount = timeSlotPatterns.get(timeKey) || 1;
    const dayTimeCount = dayTimePatterns.get(dayTimeKey) || 1;

    // Use different thresholds and combine multiple factors
    const totalOccurrences = activityCount + timeSlotCount + dayTimeCount;
    
    // More nuanced scoring
    if (activityCount >= 3 && timeSlotCount >= 2) return 'high';
    if (totalOccurrences >= 8) return 'high';
    if (totalOccurrences >= 5 || activityCount >= 2) return 'medium';
    return 'low';
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className={`grid gap-0 border border-gray-200 rounded-lg overflow-hidden shadow-sm`} style={{gridTemplateColumns: `120px repeat(${weekDays.length}, 1fr)`}}>
          <div className="bg-white p-3 border-r border-gray-200 text-sm font-semibold text-gray-700"></div>
          {weekDays.map((day) => (
            <div key={day.date} className="bg-white p-3 border-r border-gray-200 text-sm font-semibold text-gray-700 text-center">
              {day.label}
            </div>
          ))}
          
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="contents">
              <div className="p-3 border-r border-b border-gray-200 text-sm text-gray-500 bg-gray-50 font-medium">
                {timeSlot}
              </div>
              {weekDays.map((day) => {
                const dayTimeslices = getTimeslicesForSlot(day.date, timeSlot);
                if (dayTimeslices.length > 0) {
                  console.log(`Found ${dayTimeslices.length} timeslices for ${day.date} ${timeSlot}:`, dayTimeslices);
                }
                return (
                  <div key={`${day.date}-${timeSlot}`} className="border-r border-b border-gray-200 h-12 relative bg-white hover:bg-gray-50 transition-colors">
                    {dayTimeslices.map((timeslice, index) => (
                      <div
                        key={timeslice.id || index}
                        className={`absolute inset-1 rounded-sm bg-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
                        title={`${timeslice.note || 'Activity'} - ${new Date(timeslice.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} (${getRepeatabilityLevel(timeslice)} repeatability)`}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}