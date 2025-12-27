import { Mail, Github, Twitter, Linkedin } from "lucide-react";

const DeveloperCard = ({ name, role, image, bio }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group border border-slate-100">
    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-indigo-50 shadow-inner group-hover:border-indigo-100 transition-colors">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
    </div>

    <div className="text-center">
      <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
      <p className="text-indigo-600 font-medium text-sm mb-4 bg-indigo-50 inline-block px-3 py-1 rounded-full">
        {role}
      </p>
      <p className="text-slate-600 text-sm mb-6 leading-relaxed">{bio}</p>

      <div className="flex justify-center space-x-4 pt-4 border-t border-slate-50">
        <a
          href="#"
          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Github size={20} />
        </a>
        <a
          href="#"
          className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-50 rounded-full transition-colors"
        >
          <Twitter size={20} />
        </a>
        <a
          href="#"
          className="p-2 text-slate-400 hover:text-indigo-700 hover:bg-indigo-50 rounded-full transition-colors"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="#"
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
          <Mail size={20} />
        </a>
      </div>
    </div>
  </div>
);

const Contact = () => {
  const developers = [
    {
      name: "Sarah Jenkins",
      role: "Frontend Architect",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      bio: "Specializing in React performance and accessibility. ensuring every interaction feels smooth and natural.",
    },
    {
      name: "Michael Chen",
      role: "Backend Specialist",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      bio: "Expert in scalable API design and database optimization. Keeping our servers running 24/7.",
    },
    {
      name: "Jessica Lee",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      bio: "Obsessed with color theory and typography. Crafting the visual identity that defines EventHub.",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
        <h1 className="text-[18px] md:text-4xl font-bold text-slate-900 mb-2 md:mb-4">
          Meet Our Team
        </h1>
        <p className="text-[14px] md:text-xl text-slate-600">
          The talented individuals working behind the scenes to make your
          experience unforgettable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {developers.map((dev, index) => (
          <DeveloperCard key={index} {...dev} />
        ))}
      </div>

      <div className="mt-20 max-w-2xl mx-auto bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full mix-blend-overlay filter blur-xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-[18px] md:text-2xl font-bold mb-2 md:mb-4">
            Have a project in mind?
          </h2>
          <p className="text-slate-300 text-[14px] md:text-base mb-4 md:mb-8">
            We're always open to new collaborations and opportunities. Get in
            touch with us directly.
          </p>
          <a
            href="mailto:hello@eventhub.com"
            className="inline-block bg-white text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
