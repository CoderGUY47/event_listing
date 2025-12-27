import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Breadcrumbs />
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
