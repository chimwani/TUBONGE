import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { HiMenu, HiX } from 'react-icons/hi';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Forums', href: '/forums' },
  { name: 'Petitions', href: '/petitions' },
  { name: 'Report Issues', href: '/report' },
  { name: 'Public Notices', href: '/notices' },
];

const Header: React.FC = () => {
  const [isAuthenticated] = useState(false); // Replace with actual auth state

  return (
    <Disclosure as="nav" className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link
                    to="/"
                    className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                  >
                    CivicEngage
                  </Link>
                </div>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 my-auto hover:bg-white/10"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {isAuthenticated ? (
                  <button className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-200 hover:-translate-y-0.5">
                    Dashboard
                  </button>
                ) : (
                  <div className="space-x-3">
                    <Link
                      to="/login"
                      className="text-white hover:text-primary-100 px-4 py-2.5 rounded-lg text-sm font-medium border-2 border-transparent hover:border-primary-100 transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-primary-100 hover:bg-white/10 transition-colors duration-200">
                  {open ? (
                    <HiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-3 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2.5 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="mt-4 space-y-2 px-4 pb-3">
                  <Link
                    to="/login"
                    className="block w-full text-center text-white py-2.5 rounded-lg text-base font-medium border-2 border-transparent hover:border-primary-100 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center bg-gradient-to-r from-primary-600 to-primary-500 text-white py-2.5 rounded-lg text-base font-medium hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;