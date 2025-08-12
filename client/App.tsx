import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthModalProvider, useAuthModal } from "./context/AuthContext";
import SimpleAuthModal from "./components/SimpleAuthModal";
import Index from "./pages/Index";
import BusinessTypes from "./pages/BusinessTypes";
import Compliance from "./pages/Compliance";
import Schemes from "./pages/Schemes";
import Summary from "./pages/Summary";
import Chatbot from "./pages/Chatbot";
import Gamification from "./pages/Gamification";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthModalProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AuthModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const AppContent = () => {
  const { isModalOpen, modalType, closeModal } = useAuthModal();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/business-type" element={<Navigate to="/business-types" replace />} />
        <Route path="/business-types" element={<BusinessTypes />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/gamification" element={<Gamification />} />
        <Route path="/analytics" element={<Analytics />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SimpleAuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultTab={modalType}
      />
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
