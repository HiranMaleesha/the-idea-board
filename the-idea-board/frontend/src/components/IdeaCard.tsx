'use client';

import { useState } from 'react';
import { Idea } from '@/types/idea';

interface IdeaCardProps {
  idea: Idea;
  onUpvote: (ideaId: string) => Promise<void>;
}

export function IdeaCard({ idea, onUpvote }: IdeaCardProps) {
  const [isUpvoting, setIsUpvoting] = useState(false);

  const handleUpvote = async () => {
    if (isUpvoting) return;
    
    setIsUpvoting(true);
    try {
      await onUpvote(idea.id);
    } finally {
      setIsUpvoting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        {/* Idea Content */}
        <div className="flex-1">
          <p className="text-gray-900 dark:text-white text-lg leading-relaxed mb-3">
            {idea.text}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{formatDate(idea.createdAt)}</span>
            <span>•</span>
            <span>{idea.upvotes} {idea.upvotes === 1 ? 'upvote' : 'upvotes'}</span>
          </div>
        </div>

        {/* Upvote Button */}
        <button
          onClick={handleUpvote}
          disabled={isUpvoting}
          className={`flex flex-col items-center justify-center min-w-[64px] px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
            isUpvoting
              ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
              : 'border-purple-200 dark:border-purple-800 hover:border-purple-600 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105'
          }`}
          aria-label="Upvote this idea"
        >
          <svg
            className={`w-6 h-6 mb-1 transition-colors ${
              isUpvoting
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-purple-600 dark:text-purple-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span className={`text-sm font-semibold ${
            isUpvoting
              ? 'text-gray-400 dark:text-gray-500'
              : 'text-purple-600 dark:text-purple-400'
          }`}>
            {idea.upvotes}
          </span>
        </button>
      </div>
    </div>
  );
}
