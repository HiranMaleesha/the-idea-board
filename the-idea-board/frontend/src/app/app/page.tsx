'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IdeaCard } from '@/components/IdeaCard';
import { IdeaInput } from '@/components/IdeaInput';
import { Idea } from '@/types/idea';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function IdeaBoardApp() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ideas from the API
  const fetchIdeas = async () => {
    try {
      const response = await fetch(`${API_URL}/ideas`);
      if (!response.ok) {
        throw new Error('Failed to fetch ideas');
      }
      const data = await response.json();
      setIdeas(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching ideas:', err);
      setError('Failed to load ideas. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchIdeas();
  }, []);

  // Poll for updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchIdeas();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle new idea submission
  const handleIdeaSubmit = async (text: string) => {
    try {
      const response = await fetch(`${API_URL}/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to create idea');
      }

      const data = await response.json();
      setIdeas([data.data, ...ideas]);
      return true;
    } catch (err) {
      console.error('Error creating idea:', err);
      throw err;
    }
  };

  // Handle upvote
  const handleUpvote = async (ideaId: string) => {
    try {
      const response = await fetch(`${API_URL}/ideas/${ideaId}/upvote`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to upvote idea');
      }

      const data = await response.json();
      setIdeas(ideas.map(idea => 
        idea.id === ideaId ? data.data : idea
      ));
    } catch (err) {
      console.error('Error upvoting idea:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">💡</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                The Idea Board
              </span>
            </Link>
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Share Your Ideas
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Post your brilliant ideas and vote on others. Keep it concise—280 characters max!
          </p>
        </div>

        {/* Idea Input */}
        <div className="mb-12">
          <IdeaInput onSubmit={handleIdeaSubmit} />
        </div>

        {/* Ideas List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              All Ideas ({ideas.length})
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live updates</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading ideas...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={fetchIdeas}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : ideas.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
              <span className="text-6xl mb-4 block">💭</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No ideas yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Be the first to share a brilliant idea!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onUpvote={handleUpvote}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Built with Next.js, Express, and Firestore</p>
        </div>
      </footer>
    </div>
  );
}
