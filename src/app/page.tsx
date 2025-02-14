"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ArticleGridLayout from './component/GridLayout';
import {sampleData} from './component/mockData'

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Stears</h1>
    
    <ArticleGridLayout articles={sampleData} />
    </div>
  );
}