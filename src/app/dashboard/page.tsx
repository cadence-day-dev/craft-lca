"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <Container>
        <Intro />
        <article className="mb-2.5 md:mb-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-md md:text-lg tracking-wider leading-tight mb-12 text-left uppercase font-normal">
              Internal tools
            </h1>
            
            <div className="text-lg leading-relaxed">
              {loading && (
                <p className="mb-6">Loading data...</p>
              )}
              
              {error && (
                <p className="mb-6 text-red-600">Error: {error}</p>
              )}
              
              {data && (
                <div className="mb-6">
                  <h2 className="text-base font-medium mb-4">API Response:</h2>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}