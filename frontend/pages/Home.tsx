import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const Home = () => {
  return (
    <><Header />
    <div className="space-y-8 py-4">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block bg-clip-text bg-gradient-to-r from-white to-primary-200">Your Voice Matters</span>
              <span className="block text-primary-100 mt-1">Shape Your Community</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-base text-primary-100 sm:text-lg md:max-w-2xl">
              Join our platform to participate in local decision-making, share your ideas,
              and make a real difference in your community.
            </p>
            <div className="mt-6 max-w-md mx-auto sm:flex sm:justify-center">
              <div className="rounded-lg shadow-lg transform transition duration-200 hover:scale-105">
                <Link
                  to="/register"
                  className="w-full flex bg-gray-900 text-white items-center justify-center px-6 py-3 border-2 border-transparent text-base font-semibold rounded-lg md:text-lg"
                >
                  Get Started →
                </Link>
              </div>
              <div className="mt-4 rounded-lg shadow-lg sm:mt-0 sm:ml-4 transform transition duration-200 hover:scale-105">
                <Link
                  to="/about"
                  className="w-full flex items-center justify-center px-6 py-3 border-2 border-white text-base font-semibold rounded-lg text-black bg-transparent hover:bg-gray-900/50 hover:text-white md:text-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Engage With Your Community
            </span>
          </h2>
          <p className="mt-2 text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to stay informed and make your voice heard.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="relative group">
              <div className="space-y-4 p-6 rounded-xl bg-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
                <div className="h-12 w-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center transform transition duration-200 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}

const features = [
  {
    title: 'Community Forums',
    description: 'Engage in meaningful discussions about local issues and initiatives.',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    title: 'Public Polls',
    description: 'Vote on important community decisions and see real-time results.',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Issue Reporting',
    description: 'Report local issues and track their resolution progress.',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
]

export default Home