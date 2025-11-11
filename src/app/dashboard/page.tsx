"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import WeeklyCalendar from "@/app/_components/weekly-calendar";
import SignIn from "@/app/_components/sign-in";
import { useAuthStore } from "@/app/store/auth-store";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn, signOut } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('Starting API request...');
        setLoading(true);
        const response = await fetch('/api/data-proxy');
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.log('Error response:', errorText);
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isSignedIn]);

  // Show sign-in form if not authenticated
  if (!isSignedIn) {
    return <SignIn />;
  }

  return (
    <main>
      <Container>
        <Intro />
        <article>
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-normal uppercase tracking-wider">Weekly Calendar</h2>
            </div>
            <div>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-600">Error: {error}</p>}
              {data && !loading && (
                <div className="mb-6">
                  <WeeklyCalendar timeslices={data} />
                </div>
              )}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}