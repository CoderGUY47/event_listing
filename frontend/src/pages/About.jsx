import { Quote } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
        <h1 className="text-[18px] md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight dark:text-white">
          Crafting Digital Experiences
        </h1>
        <p className="text-[14px] md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto dark:text-slate-300">
          We are a passionate team of developers dedicated to creating seamless
          and beautiful web applications that connect people through events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-600 rounded-full opacity-10 blur-3xl transform translate-x-4 translate-y-4"></div>
          <div className="relative aspect-square max-w-md mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              alt="Lead Developer"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative pl-8 border-l-4 border-indigo-600">
            <Quote
              className="absolute -top-4 -left-6 text-indigo-600 bg-white p-1 rounded-full dark:bg-slate-800 dark:text-indigo-400"
              size={40}
            />
            <blockquote className="text-[18px] md:text-2xl font-light text-slate-800 italic mb-4 dark:text-slate-200">
              "Great software isn't just about code; it's about the feeling you
              get when everything just works. We build with empathy first, code
              second."
            </blockquote>
            <div className="flex items-center gap-4">
              <div>
                <div className="font-bold text-slate-900 text-lg dark:text-white">
                  Alex Rivera
                </div>
                <div className="text-slate-500 font-medium dark:text-slate-400">
                  Lead Developer
                </div>
              </div>
            </div>
          </div>

          <div className="prose text-slate-600">
            <p className="mb-4">
              Founded in 2025, EventHub started with a simple mission: ensure no
              one misses out on life's best moments.
            </p>
            <p>
              Our team works tirelessly to bring you the most curated, exciting,
              and accessible events in your city.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-[18px] md:text-3xl font-bold mb-2 md:mb-4 text-white">
            Ready to explore?
          </h2>
          <p className="text-[14px] md:text-lg text-slate-400 mb-4 md:mb-8 max-w-xl mx-auto">
            Join thousands of users who are already discovering their next great
            adventure.
          </p>
          <a
            href="/events"
            className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-full hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg"
          >
            Browse Events
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
