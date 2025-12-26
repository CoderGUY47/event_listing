import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Banner from "@/components/Banner";
import EventCard from "@/components/EventCard";
import { categories, mockEvents } from "@/lib/garbageData";

const Home = () => {
  const upcomingEvents = mockEvents;

  return (
    <div className="space-y-16">
      <Banner />

      <section>
        <h2 className="text-3xl font-bold mb-8">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/events/category/${cat.name}`}>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer text-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-1">
                <span className="font-semibold text-lg">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link
            to="/events"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcomingEvents.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
