import AdminRoutes from './pages/AdminRoutes';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Pages

import React, { Suspense } from "react";
const Index = React.lazy(() => import("./pages/Index"));
const About = React.lazy(() => import("./pages/About"));
const MissionVision = React.lazy(() => import("./pages/MissionVision"));
const History = React.lazy(() => import("./pages/History"));
const Leadership = React.lazy(() => import("./pages/Leadership"));
const Programs = React.lazy(() => import("./pages/Programs"));
const ImpactStories = React.lazy(() => import("./pages/ImpactStories"));
const News = React.lazy(() => import("./pages/News"));
const NewsDetail = React.lazy(() => import("./pages/NewsDetail"));
const Events = React.lazy(() => import("./pages/Events"));
const EventDetail = React.lazy(() => import("./pages/EventDetail"));
const GetInvolved = React.lazy(() => import("./pages/GetInvolved"));
const Partners = React.lazy(() => import("./pages/Partners"));
const CoachingPartnerDetail = React.lazy(() => import("./pages/CoachingPartnerDetail"));
const Donate = React.lazy(() => import("./pages/Donate"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Resources = React.lazy(() => import("./pages/Resources"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = React.lazy(() => import("./pages/TermsOfUse"));
const Accessibility = React.lazy(() => import("./pages/Accessibility"));
const RestoringAgriSolutionEnterprises = React.lazy(() => import("./pages/RestoringAgriSolutionEnterprises"));

const queryClient = new QueryClient();



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="py-20 text-center text-lg">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Admin dashboard routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission-vision" element={<MissionVision />} />
            <Route path="/history" element={<History />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/impact-stories" element={<ImpactStories />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/coaching-partners/:slug" element={<CoachingPartnerDetail />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/partners/restoring-agrisolution-enterprises" element={<RestoringAgriSolutionEnterprises />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
