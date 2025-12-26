const getDynamicDate = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0];
};

export const mockEvents = [
  {
    id: 1,
    title: "Jazz Night",
    date: getDynamicDate(2),
    time: "07:00 PM",
    location: "Downtown Hall",
    category: "Music",
    image: "/images/music-1.png",
    description: "A smooth evening of jazz music.",
  },
  {
    id: 2,
    title: "Tech Conf 2025",
    date: getDynamicDate(5),
    time: "09:00 AM",
    location: "Convention Center",
    category: "Technology",
    image: "/images/tech-1.png",
    description: "The biggest tech conference in the city.",
  },
  {
    id: 3,
    title: "Art Expo",
    date: getDynamicDate(8),
    time: "11:00 AM",
    location: "City Gallery",
    category: "Art",
    image: "/images/art-1.png",
    description: "Explore modern art from local artists.",
  },
  {
    id: 4,
    title: "Food Festival",
    date: getDynamicDate(12),
    time: "12:00 PM",
    location: "City Park",
    category: "Food",
    image: "/images/food-1.png",
    description: "Taste dishes from around the world.",
  },
  {
    id: 5,
    title: "City Marathon",
    date: getDynamicDate(15),
    time: "06:00 AM",
    location: "Main Street",
    category: "Sports",
    image: "/images/sports-1.png",
    description: "Run for charity in the annual marathon.",
  },
  {
    id: 6,
    title: "Pottery Workshop",
    date: getDynamicDate(18),
    time: "03:00 PM",
    location: "Creative Studio",
    category: "Workshop",
    image: "/images/workshop-1.png",
    description: "Learn how to make pottery from experts.",
  },
];

export const categories = [
  { id: "music", name: "Music" },
  { id: "art", name: "Art" },
  { id: "food", name: "Food" },
  { id: "technology", name: "Technology" },
  { id: "sports", name: "Sports" },
  { id: "workshop", name: "Workshop" },
];

export const generateMoreMockEvents = () => {
  let allEvents = [...mockEvents];
  const currentDate = new Date();

  categories.forEach((cat) => {
    for (let i = 1; i <= 4; i++) {
      const catNameLower = cat.name.toLowerCase();
      const imgPrefix = catNameLower === "technology" ? "tech" : catNameLower;
      const eventId = `${catNameLower}-${i}`;

      const eventDate = new Date();
      eventDate.setDate(currentDate.getDate() + i);
      const dateString = eventDate.toISOString().split("T")[0];

      if (
        !allEvents.some(
          (e) =>
            e.id === eventId ||
            (typeof e.id === "string" && e.id.startsWith(catNameLower))
        )
      ) {
        allEvents.push({
          id: eventId,
          title: `${cat.name} Event ${i}`,
          date: dateString,
          time: `${9 + i}:00 AM`,
          location: `City Hall ${i}`,
          category: cat.name,
          description: `Experience the best ${cat.name} event.`,
          image: `/images/${imgPrefix}-${i}.png`,
        });
      }
    }
  });
  return allEvents;
};
