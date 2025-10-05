'use client';

import { useState } from 'react';

interface IdeaInputProps {
  onSubmit: (text: string) => Promise<boolean>;
}

export function IdeaInput({ onSubmit }: IdeaInputProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxLength = 280;
  const remainingChars = maxLength - text.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter an idea');
      return;
    }

    if (text.length > maxLength) {
      setError(`Idea must be ${maxLength} characters or less`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(text.trim());
      setText('');
      setError(null);
    } catch (err) {
      setError('Failed to submit idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's your brilliant idea? Share it with the community..."
            className="w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none transition-all"
            rows={4}
            maxLength={maxLength}
            disabled={isSubmitting}
          />
          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-sm ${
                remainingChars < 20
                  ? 'text-red-600 dark:text-red-400 font-semibold'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {remainingChars} characters remaining
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !text.trim()}
          className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
            isSubmitting || !text.trim()
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:scale-[1.02]'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Posting...
            </span>
          ) : (
            'Share Idea'
          )}
        </button>
      </form>
    </div>
  );
}
