import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import AuthModal from "./AuthModal";
import UserProfileMenu from "./UserProfileMenu";
import { CalendarRange, Menu, X, Sun, Moon } from "lucide-react";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const handleOpenRegister = () => {
    setAuthMode("register");
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 dark:border-slate-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-[30px] font-black tracking-tight hover:text-indigo-600 transition-colors dark:text-white"
            >
              <CalendarRange
                size={32}
                className="text-indigo-600 dark:text-indigo-400"
              />
              <span>Event-Hub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-[18px] font-bold hover:text-indigo-600 transition-colors dark:text-gray-100 dark:hover:text-indigo-400"
              >
                Home
              </Link>
              <Link
                to="/events"
                className="text-[18px] font-bold hover:text-indigo-600 transition-colors dark:text-gray-100 dark:hover:text-indigo-400"
              >
                Events
              </Link>
              <Link
                to="/blog"
                className="text-[18px] font-bold hover:text-indigo-600 transition-colors dark:text-gray-100 dark:hover:text-indigo-400"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-[18px] font-bold hover:text-indigo-600 transition-colors dark:text-gray-100 dark:hover:text-indigo-400"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-[18px] font-bold hover:text-indigo-600 transition-colors dark:text-gray-100 dark:hover:text-indigo-400"
              >
                Contact
              </Link>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={24} className="text-yellow-400" />
                ) : (
                  <Moon size={24} className="text-slate-600" />
                )}
              </button>

              {user ? (
                <UserProfileMenu />
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleOpenLogin}
                    variant="outline"
                    className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold px-6 rounded-full transition-all hover:scale-105 active:scale-95 dark:hover:bg-indigo-900/20"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={handleOpenRegister}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                  >
                    Register
                  </Button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={24} className="text-yellow-400" />
                ) : (
                  <Moon size={24} className="text-slate-600" />
                )}
              </button>
              <button
                className="text-slate-900 dark:text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 border-t pt-4 animate-in slide-in-from-top-2 duration-200 dark:border-slate-800">
              <Link
                to="/"
                className="block text-[18px] font-bold hover:text-indigo-600 transition-colors px-2 py-1 dark:text-slate-100 dark:hover:text-indigo-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/events"
                className="block text-[18px] font-bold hover:text-indigo-600 transition-colors px-2 py-1 dark:text-slate-100 dark:hover:text-indigo-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/blog"
                className="block text-[18px] font-bold hover:text-indigo-600 transition-colors px-2 py-1 dark:text-slate-100 dark:hover:text-indigo-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="block text-[18px] font-bold hover:text-indigo-600 transition-colors px-2 py-1 dark:text-slate-100 dark:hover:text-indigo-400"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-[18px] font-bold hover:text-indigo-600 transition-colors px-2 py-1 dark:text-slate-100 dark:hover:text-indigo-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-2 border-t dark:border-slate-800">
                {user ? (
                  <div className="px-2 py-2">
                    <UserProfileMenu />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 px-2">
                    <Button
                      onClick={() => {
                        handleOpenLogin();
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold w-full rounded-full dark:hover:bg-indigo-900/20"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        handleOpenRegister();
                        setIsMenuOpen(false);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full rounded-full shadow-md"
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
