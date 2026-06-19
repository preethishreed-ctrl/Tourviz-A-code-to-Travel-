import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Globe, Menu, X, Compass, User } from "lucide-react";
import { useExplorer } from "@/context/ExplorerContext";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Trends & Compare", path: "/trends" },
  { label: "Destinations", path: "/destinations" },
  { label: "Simulator", path: "/simulator" },
  { label: "Achievements", path: "/achievements" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { count } = useExplorer();

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/home" className="flex items-center gap-2 font-display font-bold text-lg">
          <Globe className="h-6 w-6 text-primary" />
          <span className="gradient-ocean-text">TourViz</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "gradient-ocean text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/explorer"
            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              location.pathname === "/explorer"
                ? "gradient-ocean text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Compass className="h-4 w-4" />
            Explorer & Planner
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              location.pathname === "/profile"
                ? "gradient-ocean text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/profile" className="p-2 text-foreground"><User className="h-5 w-5" /></Link>
          <Link to="/explorer" className="relative p-2 text-foreground">
            <Compass className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button className="p-2 text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-card border-t px-4 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? "gradient-ocean text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/explorer" onClick={() => setOpen(false)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === "/explorer" ? "gradient-ocean text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
            <Compass className="h-4 w-4" /> Explorer & Planner {count > 0 && `(${count})`}
          </Link>
          <Link to="/profile" onClick={() => setOpen(false)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === "/profile" ? "gradient-ocean text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
            <User className="h-4 w-4" /> Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
