import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExplorerProvider } from "@/context/ExplorerContext";
import Layout from "@/components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TrendsCompare from "./pages/TrendsCompare";
import Chatbot from "./pages/Chatbot";
import ExplorerList from "./pages/ExplorerList";
import DestinationExplorer from "./pages/DestinationExplorer";
import Simulator from "./pages/Simulator";
import Gamification from "./pages/Gamification";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ExplorerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trends" element={<TrendsCompare />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/destinations" element={<DestinationExplorer />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/achievements" element={<Gamification />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explorer" element={<ExplorerList />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ExplorerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
