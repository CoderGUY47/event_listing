import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const UserProfileMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg overflow-hidden border-2 border-white shadow-sm">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(user.name)
          )}
        </div>
        <div className="hidden md:block text-right mr-3">
          <p className="text-sm font-bold text-slate-900 leading-none dark:text-white">
            {user.name}
          </p>
          <p className="text-xs text-slate-500 mt-1 dark:text-slate-300">
            {user.email}
          </p>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-fadeIn">
          <div className="px-4 py-3 border-b border-slate-100 md:hidden">
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>

          <Link
            to="/profile"
            className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User size={18} className="mr-3" />
            Your Profile
          </Link>

          <div className="border-t border-slate-100 my-1"></div>

          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
