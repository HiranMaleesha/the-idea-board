import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">💡</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              The Idea Board
            </span>
          </div>
          <Link
            href="/app"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Where Great Ideas Come to Life
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
            A collaborative platform where creativity meets community. Share your brilliant ideas, 
            discover inspiration from others, and vote on the concepts that matter most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/app"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              Start Sharing Ideas
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-600 transition-all duration-200 w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Choose The Idea Board?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to capture, share, and amplify brilliant ideas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Instant Sharing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Share your ideas instantly with the community. No sign-up required, no barriers—just pure creativity flowing freely.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Community Driven
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Let the community decide what&apos;s great. Upvote the ideas you love and watch the best concepts rise to the top.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Real-Time Updates
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Experience live updates as ideas are shared and voted on. Stay connected with the pulse of creativity in real-time.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Simple & Focused
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Keep it concise with 280 characters. Clarity breeds creativity, and brevity sparks engagement.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Share Your Ideas?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join our community of innovators, dreamers, and creators. Your next big idea is just a click away.
          </p>
          <Link
            href="/app"
            className="inline-block px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            Get Started Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2"> 2025 The Idea Board. Built with passion and purpose.</p>
          <p className="text-sm">Empowering creativity, one idea at a time.</p>
        </div>
      </footer>
    </div>
  );
}
