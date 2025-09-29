import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GitFork, Menu, X } from 'lucide-react';
import frostrLogo from '/frostr-logo-transparent.png';
import PropTypes from 'prop-types';

const ORG = 'FROSTR-ORG';

function Layout({ error, roadmapEnabled = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1a] bg-opacity-95 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a]" />
      
      <div className="relative max-w-7xl mx-auto p-6 md:p-8 space-y-8 max-md:p-2">
        {/* Header with Tabs */}
        <div className="flex items-center justify-between border-b border-[#ffffff1a] pb-4">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <img 
                src={frostrLogo} 
                alt="Frostr Logo" 
                className="w-10 h-10 absolute inset-0"
              />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff95] to-[#00f0ff] font-mono">
              FROSTR
            </h1>
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 text-lg font-medium transition-colors ${
                  isActive
                    ? "text-[#00ff95] border-b-2 border-[#00ff95]"
                    : "text-gray-400 hover:text-gray-200"
                }`
              }
              end
            >
              About
            </NavLink>
            <NavLink
              to="/apps"
              className={({ isActive }) =>
                `px-4 py-2 text-lg font-medium transition-colors ${
                  isActive
                    ? "text-[#00ff95] border-b-2 border-[#00ff95]"
                    : "text-gray-400 hover:text-gray-200"
                }`
              }
            >
              Apps
            </NavLink>
            <NavLink
              to="/media"
              className={({ isActive }) =>
                `px-4 py-2 text-lg font-medium transition-colors ${
                  isActive
                    ? "text-[#00ff95] border-b-2 border-[#00ff95]"
                    : "text-gray-400 hover:text-gray-200"
                }`
              }
            >
              Media
            </NavLink>
            {roadmapEnabled && (
              <NavLink
                to="/roadmap"
                className={({ isActive }) =>
                  `px-4 py-2 text-lg font-medium transition-colors ${
                    isActive
                      ? "text-[#00ff95] border-b-2 border-[#00ff95]"
                      : "text-gray-400 hover:text-gray-200"
                  }`
                }
              >
                Roadmap
              </NavLink>
            )}
          </div>
          
          {/* GitHub Link */}
          <div className="flex items-center">
            <a 
              href={`https://github.com/${ORG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-[#00f0ff] transition-colors"
            >
              <GitFork className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="ml-4 md:hidden text-gray-300 hover:text-[#00ff95] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#161f33]/90 backdrop-blur-lg rounded-md shadow-lg border border-[#ffffff10] p-4 absolute z-50 left-2 right-2 mt-2 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-lg font-medium transition-colors rounded-md ${
                    isActive
                      ? "bg-[#00ff9520] text-[#00ff95]"
                      : "text-gray-300 hover:bg-[#ffffff10]"
                  }`
                }
                end
              >
                About
              </NavLink>
              <NavLink
                to="/apps"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-lg font-medium transition-colors rounded-md ${
                    isActive
                      ? "bg-[#00ff9520] text-[#00ff95]"
                      : "text-gray-300 hover:bg-[#ffffff10]"
                  }`
                }
              >
                Apps
              </NavLink>
              <NavLink
                to="/media"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-lg font-medium transition-colors rounded-md ${
                    isActive
                      ? "bg-[#00ff9520] text-[#00ff95]"
                      : "text-gray-300 hover:bg-[#ffffff10]"
                  }`
                }
              >
                Media
              </NavLink>
              {roadmapEnabled && (
                <NavLink
                  to="/roadmap"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-lg font-medium transition-colors rounded-md ${
                      isActive
                        ? "bg-[#00ff9520] text-[#00ff95]"
                        : "text-gray-300 hover:bg-[#ffffff10]"
                    }`
                  }
                >
                  Roadmap
                </NavLink>
              )}
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border border-red-500/50 text-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Route Content */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  error: PropTypes.string,
  roadmapEnabled: PropTypes.bool
};

export default Layout; 
