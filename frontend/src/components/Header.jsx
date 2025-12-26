import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store";

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <header className="border-b bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-[30px] font-black">
          EventHub
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-[18px] font-bold hover:underline">
            Home
          </Link>
          <Link to="/events" className="text-[18px] font-bold hover:underline">
            Events
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-xl font-bold hover:underline"
              >
                Dashboard
              </Link>
              <Button onClick={logout} variant="outline" size="sm" className="text-[18px]">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-[18px]">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="text-[18px]">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
