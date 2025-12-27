import { Routes, Route } from "react-router-dom";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import EventList from "@/pages/EventList";
import EventDetail from "@/pages/EventDetail";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import Profile from "@/pages/Profile";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position="top-right" />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventList />} />
              <Route
                path="/events/category/:category"
                element={<EventList />}
              />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
