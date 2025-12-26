import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Banner from "@/components/Banner";
import EventCard from "@/components/EventCard";
import { categories, mockEvents } from "@/lib/garbageData";

const Home = () => {
  const upcomingEvents = mockEvents;

  return (
    <div className="space-y-20 pb-20">
      <Banner />

      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Upcoming Events
          </h2>
          <Link
            to="/events"
            className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 group transition-all"
          >
            View all
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcomingEvents.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold tracking-tight mb-10 text-slate-900">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/events/category/${cat.name}`}
              className="group"
            >
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer text-center border border-slate-100 hover:border-blue-100 dark:bg-slate-800 dark:border-slate-700 group-hover:-translate-y-2 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <span className="text-xl font-bold">
                    {cat.name.charAt(0)}
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
