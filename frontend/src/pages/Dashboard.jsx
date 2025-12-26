import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import api from "@/api";
import useAuthStore from "@/store";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Music",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchMyEvents();
  }, [isAuthenticated, navigate]);

  const fetchMyEvents = async () => {
    try {
      const res = await api.get("/events");
      if (user) {
        setEvents(
          res.data.filter(
            (e) => e.organizer._id === user.id || e.organizer === user.id
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", formData);
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "Music",
      });
      fetchMyEvents();
    } catch (err) {
      alert("Failed to create event");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Welcome, {user?.name}</h2>
        <p>Manage your events and profile here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold mb-4">Create New Event</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Food">Food</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
            </select>
            <Button type="submit">Create Event</Button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">My Events</h3>
          {events.length === 0 ? (
            <p>No events created yet.</p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white dark:bg-slate-800 p-4 rounded shadow border flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold">{event.title}</h4>
                    <p className="text-sm text-slate-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
