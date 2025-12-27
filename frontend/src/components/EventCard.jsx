import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

const EventCard = ({ event }) => {
  const { _id, id, title, description, date, time, location, image, category } =
    event;

  // Handle both _id (MongoDB) and id (local mock)
  const eventId = _id || id;

  // Default description if missing
  const displayDescription =
    description ||
    `Join us for an amazing ${
      category?.toLowerCase() || "event"
    } experience at ${location}. Don't miss out!`;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 flex flex-col h-full group dark:bg-slate-900 dark:border-slate-800">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm backdrop-blur-sm dark:bg-slate-900/90 dark:text-white">
          {category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-slate-900 line-clamp-1 dark:text-white">
          {title}
        </h3>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow dark:text-slate-400">
          {displayDescription}
        </p>

        <div className="space-y-2 mb-6 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar
              size={16}
              className="text-indigo-500 dark:text-indigo-400"
            />
            <span>
              {new Date(date).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          {time && (
            <div className="flex items-center gap-2">
              <Clock
                size={16}
                className="text-indigo-500 dark:text-indigo-400"
              />
              <span>{time}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin
              size={16}
              className="text-indigo-500 dark:text-indigo-400"
            />
            <span>{location}</span>
          </div>
        </div>

        <Link to={`/events/${eventId}`} className="mt-auto">
          <Button className="w-full group-hover:bg-indigo-400 transition-colors dark:bg-slate-800 dark:text-white dark:hover:bg-indigo-600">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
