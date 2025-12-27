import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  return (
    <nav className="flex px-6 py-3 text-slate-600 bg-slate-50 border-b border-slate-200">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="flex items-center hover:text-indigo-600 transition-colors"
          >
            <Home size={16} />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const formattedValue =
            value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ");

          return (
            <li key={to} className="flex items-center">
              <ChevronRight size={16} className="mx-1 text-slate-400" />
              {last ? (
                <span className="font-medium text-slate-900">
                  {formattedValue}
                </span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {formattedValue}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
