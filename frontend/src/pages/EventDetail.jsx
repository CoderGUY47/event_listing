import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import api from "@/api";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Failed to fetch event", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <div className="flex flex-wrap gap-4 text-slate-500 mb-6">
          <span>
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </span>
          <span>•</span>
          <span>{event.location}</span>
          <span>•</span>
          <span className="text-blue-600 font-medium">{event.category}</span>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>{event.description}</p>
        </div>

        <div className="mt-8">
          <Button size="lg">Save Event</Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
