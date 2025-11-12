import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/landing-page/Index";
import NotFound from "./pages/NotFound";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/about-us/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Testimonials from "./pages/testimonials/Testimonials";
import Portfolio from "./pages/Portfolio";
import Careers from "./pages/Careers";
import Vision from "./pages/Vision";
import ProjectsNoida from "./pages/ProjectsNoida";
import ProjectsGreaterNoida from "./pages/ProjectsGreaterNoida";
import ProjectsYamuna from "./pages/ProjectsYamuna";
import AdminIndex from "./pages/admin/Index";
import AdminProperties from "./pages/admin/Properties";
import AdminAddProperty from "./pages/admin/AddProperty";
import AdminDealers from "./pages/admin/Dealers";
import AdminUsers from "./pages/admin/Users";
import AdminCareers from "./pages/admin/Careers";
import AdminPostJob from "./pages/admin/PostJob";
import AdminSettings from "./pages/admin/Settings";
import AdminNotFound from "./pages/admin/NotFound";
import { ProtectedRoute } from "./components/api/protectedRoutes";
import Maps from "./pages/maps";
import GreaterNoidaMaps from "./pages/GreaterNoidaMaps";
import MapDetailPage from "./pages/MapDetailPage";
import YamunaMaps from "./pages/YamunaMaps";
import MapDetailPage2 from "./pages/MapsDetailPage2";
import ComingSoon from "./pages/coming-soon";


// Query client
const queryClient = new QueryClient();

// Page Loader Component
const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/90 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gold border-solid"></div>
  </div>
);

// Route wrapper to handle loading
const RouteWrapper = ({ element }: { element: React.ReactNode }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300); // 0.7 sec delay
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <PageLoader />}
      <div className={`${loading ? "opacity-50" : "opacity-100"} transition-opacity duration-500`}>
        {element}
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RouteWrapper element={<Index />} />} />
          <Route path="/properties" element={<RouteWrapper element={<Properties />} />} />
          <Route path="/property/:id" element={<RouteWrapper element={<PropertyDetail />} />} />
          <Route path="/about" element={<RouteWrapper element={<About />} />} />
          <Route path="/contact" element={<RouteWrapper element={<Contact />} />} />
          <Route path="/login" element={<RouteWrapper element={<Login />} />} />
          <Route path="/testimonials" element={<RouteWrapper element={<Testimonials />} />} />
          <Route path="/portfolio" element={<RouteWrapper element={<Portfolio />} />} />
          <Route path="/careers" element={<RouteWrapper element={<Careers />} />} />
          <Route path="/vision" element={<RouteWrapper element={<Vision />} />} />
          <Route path="/maps" element={<RouteWrapper element={<Maps/>}/>}/>
          <Route path="/maps/greaternoida" element={<RouteWrapper element={<GreaterNoidaMaps/>}/>}/>
          <Route path="/maps/yamunaexpressway" element={<RouteWrapper element={<YamunaMaps/>}/>}/>
          <Route path="/projects/noida" element={<RouteWrapper element={<ProjectsNoida />} />} />
          <Route path="/projects/greater-noida" element={<RouteWrapper element={<ProjectsGreaterNoida />} />} />
          <Route path="/projects/yamuna" element={<RouteWrapper element={<ProjectsYamuna />} />} />
          <Route path="/maps/greaternoida/:mapId" element={<MapDetailPage />} />
          <Route path="/maps/yamuna/:mapId" element={<MapDetailPage2 />} />
          <Route path="/comingsoon" element={<ComingSoon />} />

          <Route path="*" element={<RouteWrapper element={<NotFound />} />} />

       
<Route
  path="/admin"
  element={
    <ProtectedRoute
      element={<AdminIndex />}
      allowedRoles={["admin", "superadmin"]}
    />
  }
/>

<Route
  path="/admin/properties"
  element={
    <ProtectedRoute
      element={<AdminProperties />}
      allowedRoles={["admin", "superadmin"]}
    />
  }
/>

<Route
  path="/admin/properties/new"
  element={
    <ProtectedRoute
      element={<AdminAddProperty />}
      allowedRoles={["admin", "superadmin"]}
    />
  }
/>

<Route
  path="/admin/dealers"
  element={
    <ProtectedRoute
      element={<AdminDealers />}
      allowedRoles={["superadmin"]}
    />
  }
/>

<Route
  path="/admin/users"
  element={
    <ProtectedRoute
      element={<AdminUsers />}
      allowedRoles={["superadmin"]}
    />
  }
/>

<Route
  path="/admin/careers"
  element={
    <ProtectedRoute
      element={<AdminCareers />}
      allowedRoles={["superadmin"]}
    />
  }
/>

<Route
  path="/admin/careers/new"
  element={
    <ProtectedRoute
      element={<AdminPostJob />}
      allowedRoles={["superadmin"]}
    />
  }
/>

<Route
  path="/admin/settings"
  element={
    <ProtectedRoute
      element={<AdminSettings />}
      allowedRoles={["superadmin"]}
    />
  }
/>

          <Route path="*" element={<AdminNotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
