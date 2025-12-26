import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white dark:bg-slate-50 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-[30px] font-black tracking-tight hover:text-blue-600 transition-colors"
        >
          EventHub
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-[18px] font-bold hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="text-[18px] font-bold hover:text-blue-600 transition-colors"
          >
            Events
          </Link>
          <Link
            to="/blog"
            className="text-[18px] font-bold hover:text-blue-600 transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="text-[18px] font-bold hover:text-blue-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-[18px] font-bold hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
