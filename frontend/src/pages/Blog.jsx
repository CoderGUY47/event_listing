import { Calendar, User, ArrowRight, Tag } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: "The Future of Live Events: Hybrid Experiences & Beyond",
    excerpt:
      "As technology evolves, the line between physical and digital gatherings is blurring. Discover how the events industry is adapting to a new era of connectivity and what it means for attendees.",
    author: "Alex Richardson",
    date: "Dec 26, 2025",
    category: "Industry Trends",
    image: "/images/tech-1.png",
  };

  const posts = [
    {
      id: 2,
      title: "5 Tips for Discovering Local Hidden Gems",
      excerpt:
        "Tired of the same old tourist traps? Here is how to find unique, off-the-beaten-path events in your city that offer authentic experiences.",
      author: "Sarah Jenkins",
      date: "Dec 22, 2025",
      category: "Lifestyle",
      image: "/images/food-1.png",
    },
    {
      id: 3,
      title: "Networking 101: Making Meaningful Connections",
      excerpt:
        "Events are more than just entertainment; they are opportunities. Learn the art of conversation and how to build a professional network that lasts.",
      author: "Michael Chen",
      date: "Dec 18, 2025",
      category: "Career",
      image: "/images/workshop-1.png",
    },
    {
      id: 4,
      title: "Sustainable Events: Partying with a Purpose",
      excerpt:
        "How organizers and attendees can reduce their carbon footprint. From zero-waste festivals to eco-friendly venues, sustainability is the new standard.",
      author: "Jessica Lee",
      date: "Dec 15, 2025",
      category: "Sustainability",
      image: "/images/art-1.png",
    },
    {
      id: 5,
      title: "The Ultimate Guide to Music Festivals 2026",
      excerpt:
        "Get ready for the upcoming festival season! We have compiled a list of the must-visit music events happening across the globe next year.",
      author: "Alex Richardson",
      date: "Dec 10, 2025",
      category: "Music",
      image: "/images/music-1.png",
    },
    {
      id: 6,
      title: "How to Organize Your Own Community Meetup",
      excerpt:
        "Want to bring people together? Follow this step-by-step guide to planning, promoting, and hosting a successful local meetup for your interests.",
      author: "Sarah Jenkins",
      date: "Dec 05, 2025",
      category: "Community",
      image: "/images/sports-1.png",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
        <h1 className="text-[18px] md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight dark:text-white">
          EventHub <span className="text-indigo-600">Insights</span>
        </h1>
        <p className="text-[14px] md:text-xl text-slate-600 leading-relaxed dark:text-white">
          Stories, tips, and trends from the world of events. Explore our
          collection of articles designed to inspire your next adventure.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-20">
        <div className="group relative rounded-3xl overflow-hidden shadow-2xl bg-white grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <span className="absolute top-4 left-4 z-20 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Featured
            </span>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                <Tag size={14} />
                {featuredPost.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {featuredPost.date}
              </span>
            </div>
            <h2 className="text-[18px] md:text-4xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight group-hover:text-indigo-600 transition-colors">
              {featuredPost.title}
            </h2>
            <p className="text-slate-600 text-[14px] md:text-lg mb-4 md:mb-8 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                  {featuredPost.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {featuredPost.author}
                  </p>
                  <p className="text-xs text-slate-500">Editor</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
                Read Article <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts Grid */}
      <div className="mb-12">
        <h3 className="text-[18px] md:text-2xl font-bold text-slate-900 mb-4 md:mb-8 flex items-center gap-2">
          <span className="w-1 h-8 bg-indigo-600 rounded-full block"></span>
          Latest Articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <Calendar size={12} />
                  {post.date}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h4>
                <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-400" />
                    <span className="text-xs font-medium text-slate-600">
                      {post.author}
                    </span>
                  </div>
                  <span className="text-indigo-600 text-xs font-bold group-hover:translate-x-1 transition-transform cursor-pointer">
                    Read More &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-[18px] md:text-3xl font-bold mb-2 md:mb-4">
            Stay in the Loop
          </h2>
          <p className="text-slate-400 text-[14px] md:text-base mb-4 md:mb-8">
            Subscribe to our newsletter to get the latest event insights, tips,
            and exclusive offers delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
