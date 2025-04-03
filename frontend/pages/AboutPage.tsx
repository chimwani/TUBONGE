import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gray-800 text-white p-6">
            <h1 className="text-2xl sm:text-3xl font-bold">About Us</h1>
            <p className="text-gray-300 text-sm mt-1">
              Empowering citizens through digital participation and transparency.
            </p>
          </div>

          {/* Introduction */}
          <section className="p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We are a platform dedicated to bridging the gap between citizens, government officials,
              and NGOs in Kenya. Our goal is to foster an inclusive, transparent, and participatory
              democracy by leveraging technology to amplify voices, promote accountability, and
              enhance public engagement.
            </p>
          </section>

          {/* Core Features */}
          <section className="p-6 bg-gray-50 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
              Core Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feature 1: User Authentication & Profiles */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  User Authentication & Profiles
                </h3>
                <p className="text-gray-600 text-sm">
                  Register and log in using email, phone, or social media. Choose your role—Citizen,
                  Government Official, NGO, or Admin—and report issues anonymously if needed.
                </p>
              </div>

              {/* Feature 2: Digital Participation */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Digital Participation
                </h3>
                <p className="text-gray-600 text-sm">
                  Engage in discussion forums, vote on policies, sign petitions, and report issues
                  to influence decision-making in your community.
                </p>
              </div>

              {/* Feature 3: Public Engagement */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Public Engagement & Awareness
                </h3>
                <p className="text-gray-600 text-sm">
                  Stay informed with public notices, access educational content, and enjoy
                  multilingual support in major Kenyan languages.
                </p>
              </div>

              {/* Feature 4: Accessibility */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Accessibility & Inclusivity
                </h3>
                <p className="text-gray-600 text-sm">
                  Use our mobile-friendly app offline, participate via SMS/USSD, or leverage
                  voice-to-text for seamless access.
                </p>
              </div>

              {/* Feature 5: Transparency */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Transparency & Accountability
                </h3>
                <p className="text-gray-600 text-sm">
                  Track issues in real-time, follow government responses, and explore data analytics
                  to see the impact of your participation.
                </p>
              </div>

              {/* Feature 6: Communication */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Communication & Notifications
                </h3>
                <p className="text-gray-600 text-sm">
                  Receive updates via email, SMS, push notifications, WhatsApp, or social media to
                  stay connected.
                </p>
              </div>

              {/* Feature 7: Management Panel */}
              <div className="p-4 bg-white rounded-lg shadow-sm col-span-1 sm:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Government & NGO Management
                </h3>
                <p className="text-gray-600 text-sm">
                  Admins and officials can manage forums, track participation, share budgets, and
                  provide access to legislative documents.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Join the Movement
            </h2>
            <p className="text-gray-700 mb-6">
              Be part of a community that shapes the future of governance in Kenya. Sign up today
              and make your voice heard!
            </p>
            <a
              href="/register"
              className="inline-block bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              Get Started
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;