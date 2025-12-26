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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-sm backdrop-blur-sm">
          {category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white line-clamp-1">
          {title}
        </h3>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
          {displayDescription}
        </p>

        <div className="space-y-2 mb-6 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-500" />
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
              <Clock size={16} className="text-blue-500" />
              <span>{time}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" />
            <span>{location}</span>
          </div>
        </div>

        <Link to={`/events/${eventId}`} className="mt-auto">
          <Button className="w-full group-hover:bg-indigo-400 transition-colors">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
