import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.API_KEY;
    const baseUrl = process.env.BASE_URL;

    console.log('Environment check:', {
      apiKeyExists: !!apiKey,
      baseUrlExists: !!baseUrl,
      apiKeyLength: apiKey?.length,
      baseUrl: baseUrl
    });

    if (!apiKey || !baseUrl) {
      console.log('Missing environment variables');
      return NextResponse.json(
        { error: 'API configuration missing', apiKey: !!apiKey, baseUrl: !!baseUrl },
        { status: 500 }
      );
    }

    // Get activities data
    const endpoint = '/activities';
    const url = `${baseUrl}${endpoint}`;
    
    console.log('Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('External API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('External API error response:', errorText);
      throw new Error(`External API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('External API success, data:', data);
    return NextResponse.json(data);

  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from external API', details: error.message },
      { status: 500 }
    );
  }
}