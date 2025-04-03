import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { HiMenu, HiX, HiUser } from 'react-icons/hi'; // Added HiUser for profile icon
import { AuthContext } from '../AuthContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Forums', href: '/forums' },
  { name: 'Petitions', href: '/petitions' },
  { name: 'Report Issues', href: '/report' },
  { name: 'Public Notices', href: '/notices' },
];

const Header: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Disclosure as="nav" className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link
                  to="/"
                  className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200"
                >
                  CivicEngage
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:items-center sm:space-x-1 sm:ml-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Desktop Auth/Profile Links */}
              <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-3">
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                    title="User Profile"
                  >
                    <HiUser className="h-6 w-6" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium rounded-lg border-2 border-transparent hover:border-primary-100 hover:text-primary-100 transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center">
                <Disclosure.Button className="p-2 rounded-lg hover:bg-white/10 hover:text-primary-100 transition-colors duration-200">
                  {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          <Disclosure.Panel className="sm:hidden bg-gray-900/95 backdrop-blur-sm">
            <div className="px-3 pt-2 pb-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2.5 text-base font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              
                <Link
                  to="/profile"
                  className="block px-4 py-2.5 text-base font-medium rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center"
                >
                  <HiUser className="h-5 w-5 mr-2" />
                  Profile
                </Link>
              
                
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;