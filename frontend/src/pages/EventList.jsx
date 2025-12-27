import { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import api from "@/api";
import { generateMoreMockEvents } from "@/lib/garbageData";

const EventList = () => {
  const [events, setEvents] = useState(() => generateMoreMockEvents());
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { category: categoryPath } = useParams();

  const categoryParam = categoryPath || searchParams.get("category");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        if (response.data && response.data.length > 0) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = categoryParam
    ? events.filter(
        (event) => event.category.toLowerCase() === categoryParam.toLowerCase()
      )
    : events;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold dark:text-white">
        {categoryParam ? `${categoryParam} Events` : "All Events"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(filteredEvents.length > 0 ? filteredEvents : events).map((event) => (
          <EventCard key={event._id || event.id} event={event} />
        ))}
        {filteredEvents.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
            No events found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
