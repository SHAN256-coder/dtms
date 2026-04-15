import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import BusRoutesPage from "@/pages/BusRoutesPage";
import SafetyPage from "@/pages/SafetyPage";
import FeedbackPage from "@/pages/FeedbackPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import LocatePage from "@/pages/LocatePage";
import NoticeBoardPage from "@/pages/NoticeBoardPage";
import UpdatesPage from "@/pages/UpdatesPage";
import CoordinatorsPage from "@/pages/CoordinatorsPage";
import LoginPage from "@/pages/LoginPage";
import ChatBot from "@/components/ChatBot";
import ScrollUpButton from "@/components/ScrollUpButton";
import MagicCursor from "@/components/MagicCursor";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient();
const routerBasename =
  import.meta.env.BASE_URL === "/"
    ? "/"
    : import.meta.env.BASE_URL.replace(/\/$/, "");

const easeOut = cubicBezier(0.25, 0.1, 0.25, 1);
const easeIn = cubicBezier(0.42, 0, 1, 1);

const pageTransition = {
  initial: { opacity: 0, filter: "blur(10px)", scale: 0.98, y: 20 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0, transition: { duration: 0.5, ease: easeOut, staggerChildren: 0.1 } },
  exit: { opacity: 0, filter: "blur(10px)", scale: 0.96, y: -20, transition: { duration: 0.3, ease: easeIn } }
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/home" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/routes" element={<PageWrapper><BusRoutesPage /></PageWrapper>} />
          <Route path="/safety" element={<PageWrapper><SafetyPage /></PageWrapper>} />
          <Route path="/feedback" element={<PageWrapper><FeedbackPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/updates" element={<ProtectedRoute><PageWrapper><UpdatesPage /></PageWrapper></ProtectedRoute>} />
          <Route path="/locate" element={<PageWrapper><LocatePage /></PageWrapper>} />
          <Route path="/notices" element={<PageWrapper><NoticeBoardPage /></PageWrapper>} />
          <Route path="/coordinators" element={<PageWrapper><CoordinatorsPage /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={routerBasename}>
          <div className="flex min-h-screen flex-col overflow-x-hidden pt-20">
            <Navbar />
            <main className="flex-1 w-full mx-auto relative">
              <AnimatedRoutes />
            </main>
            <Footer />
            <ChatBot />
            <ScrollUpButton />
            <MagicCursor />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
