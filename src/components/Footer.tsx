import { Globe } from "lucide-react";

const Footer = () => (
  <footer className="gradient-ocean text-primary-foreground py-8 mt-16">
    <div className="container mx-auto px-4 text-center space-y-2">
      <div className="flex items-center justify-center gap-2 font-display font-bold text-lg">
        <Globe className="h-5 w-5" />
        TourViz
      </div>
      <p className="text-sm opacity-80">
        Interactive Tours and Travel Data Visualisation Platform
      </p>
      <p className="text-sm opacity-60">
        © {new Date().getFullYear()} TourViz — Final Year Project
      </p>
    </div>
  </footer>
);

export default Footer;
