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
        <h2 className="text-[18px] md:text-4xl font-extrabold tracking-tight mb-4 md:mb-10 text-slate-900 dark:text-white">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/events/category/${cat.name}`}
              className="group flex justify-center"
            >
              <div className="w-[150px] h-[150px] bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer text-center border border-slate-100 hover:border-indigo-100 group-hover:-translate-y-2 flex flex-col items-center justify-center gap-2 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-indigo-500">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 dark:bg-slate-700 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
                  <span className="text-xl font-bold">
                    {cat.name.charAt(0)}
                  </span>
                </div>
                <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors dark:text-slate-200 dark:group-hover:text-indigo-400">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4 md:mb-10">
          <h2 className="text-[18px] md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Upcoming Events
          </h2>
          <Link
            to="/events"
            className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 group transition-all dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcomingEvents.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 bg-indigo-600 py-8 md:py-16 rounded-3xl text-white text-center">
        <h2 className="text-[18px] md:text-4xl font-extrabold mb-2 md:mb-4 tracking-tight">
          Stay Connected
        </h2>
        <p className="text-[14px] md:text-xl text-indigo-100 mb-4 md:mb-8 max-w-2xl mx-auto">
          Have questions about an event or want to partner with us? Reach out to
          our team anytime.
        </p>
        <Link to="/contact">
          <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-10 py-6 rounded-full text-lg shadow-lg transition-all hover:scale-105 active:scale-95">
            Contact Us
          </Button>
        </Link>
      </section>
    </div>
  );
};
export default Home;
