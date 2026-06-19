import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart3, Globe2, TrendingUp, MessageSquare, Map, ArrowRight,
  Plane, DollarSign, Users, FileBarChart, Sparkles, Calculator, Route
} from "lucide-react";
import heroBg from "@/assets/hero-bg-new.jpg";
import aboutImg from "@/assets/about-travel.jpg";
import featuresImg from "@/assets/features-analytics.jpg";
import landmarksImg from "@/assets/landmarks.jpg";
import cardArrivals from "@/assets/card-arrivals.jpg";
import cardRevenue from "@/assets/card-revenue.jpg";
import cardVisa from "@/assets/card-visa.jpg";
import cardVisitors from "@/assets/card-visitors.jpg";
import cardGdp from "@/assets/card-gdp.jpg";
import cardSocio from "@/assets/card-socio.jpg";
import dashOverview from "@/assets/dash-overview.jpg";
import dashRevenue from "@/assets/dash-revenue.png";
import dashInsights from "@/assets/dash-insights.jpg";
import dashSocio from "@/assets/dash-socio.jpg";

const features = [
  { icon: BarChart3, title: "Interactive Dashboards", desc: "Explore tourism data with rich, interactive visualizations and real-time analytics. Dive deep into arrivals, revenue, and visitor trends across 50+ countries with dynamic charts and filters." },
  { icon: Globe2, title: "Country Comparison", desc: "Compare tourism metrics across countries including arrivals, revenue, and employment. Identify top-performing destinations and benchmark countries side-by-side to uncover hidden opportunities." },
  { icon: TrendingUp, title: "Trends Analysis", desc: "Track tourism growth patterns over years with detailed trend indicators. Understand how global events like COVID-19 shaped travel behavior and forecast future recovery trajectories." },
  { icon: Calculator, title: "Tour Plan Simulator", desc: "Plan your dream trip with our smart simulator — set your budget, pick destinations, and get a detailed expenditure breakdown. Generate printable tour reports with estimated costs, stay duration, and travel logistics." },
  { icon: Route, title: "Destination Planner", desc: "Decide your next travel destination based on real data. Compare costs, visa requirements, and visitor ratings to make informed choices that match your budget and preferences." },
  { icon: Sparkles, title: "Report Generation", desc: "Generate comprehensive tour plan reports with a single click. Get a complete summary of your itinerary, budget allocation, destination highlights, and travel tips — ready to download and share." },
  { icon: MessageSquare, title: "AI Chatbot", desc: "Get instant tourism insights powered by an intelligent assistant. Ask questions about destinations, visa policies, best travel seasons, and receive data-backed recommendations in real time." },
  { icon: Map, title: "Map Visualization", desc: "Visualize visitor distribution across countries on an interactive map. Explore heatmaps of tourist density, popular corridors, and seasonal travel flows at a glance." },
  { icon: FileBarChart, title: "Socio-Economic Impact", desc: "Analyze tourism's effect on employment, literacy, and GDP. Understand how travel drives local economies, creates jobs, and contributes to national development indicators worldwide." },
];

const about = [
  { icon: Plane, label: "Tourism Arrivals", img: cardArrivals, desc: "Tracks international tourist arrivals across 50+ countries. France leads with 89.4M arrivals, followed by Spain and the USA." },
  { icon: DollarSign, label: "Revenue Analysis", img: cardRevenue, desc: "Analyzes tourism revenue from 2003–2023. The USA is the highest earner at $214.5B, with global tourism generating over $1.7 trillion annually." },
  { icon: Users, label: "Visa Distribution", img: cardVisa, desc: "Schengen (26.64%), Visa on Arrival (25.56%), Tourist Visa (25.5%), and E-Visa (22.3%). Over 72 countries now offer e-visa programs." },
  { icon: TrendingUp, label: "Visitor Trends", img: cardVisitors, desc: "Tourism saw a 72.6% decline in 2020 due to COVID-19, but recovered with 111% growth in 2022. Current growth is 8.5% annually." },
  { icon: BarChart3, label: "GDP Contribution", img: cardGdp, desc: "Tourism accounts for ~9.9% of global GDP. Countries with higher tourism rates show stronger economic indicators and infrastructure." },
  { icon: Globe2, label: "Socio-Economic Impact", img: cardSocio, desc: "Examines tourism's effect on employment, literacy, and waste management. China leads employment at 7.5% in the tourism sector." },
];

const dashboardPreviews = [
  { title: "Tourist Arrivals & Visa Distribution", img: dashOverview },
  { title: "Revenue Analysis", img: dashRevenue },
  { title: "Tourism Data Insights", img: dashInsights },
  { title: "Socio-Economic Impact", img: dashSocio },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Home = () => (
  <div>
    {/* Hero */}
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="Tropical beach paradise" className="absolute inset-0 w-full h-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
          Interactive Tours & Travel{" "}
          <span className="text-secondary">Data Visualisation</span> Platform
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          A smart tourism analytics platform with interactive dashboards, trends, comparisons, and AI-driven insights to understand tourism patterns worldwide.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 gradient-ocean text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          View Dashboard <ArrowRight className="h-5 w-5" />
        </Link>
      </motion.div>
    </section>

    {/* About with image */}
    <section className="py-20 container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} custom={0} className="section-heading mb-4">
            About This <span className="gradient-ocean-text">Project</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground mb-6">
            This platform uses tourism datasets to visualize key metrics and uncover patterns that drive the global travel industry.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {about.map((item) => (
              <div key={item.label} className="relative overflow-hidden rounded-xl group cursor-pointer">
                <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm group-hover:bg-background/60 transition-colors" />
                <div className="relative z-10 p-5 text-center">
                  <item.icon className="h-7 w-7 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold mb-2">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img src={aboutImg} alt="European city at golden hour" className="rounded-2xl shadow-2xl w-full object-cover h-[400px]" />
          <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4 shadow-lg">
            <p className="text-sm font-semibold text-foreground">🌍 50+ Countries Analyzed</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-8 text-center"
      >
        <motion.p variants={fadeUp} custom={0} className="text-muted-foreground">
          <strong className="text-foreground">Tools & Technologies:</strong> React · TypeScript · Tailwind CSS · Recharts · Framer Motion · Power BI
        </motion.p>
      </motion.div>
    </section>

    {/* Dashboard Previews */}
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-heading text-center mb-4"
        >
          Power BI <span className="gradient-ocean-text">Dashboard Previews</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-10"
        >
          Our dashboards are inspired by these Power BI visualizations
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {dashboardPreviews.map((d) => (
            <Link to="/dashboard" key={d.title} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img src={d.img} alt={d.title} className="w-full h-[280px] object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display font-semibold text-foreground text-sm">{d.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-heading text-center mb-12"
        >
          Platform <span className="gradient-ocean-text">Features</span>
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} custom={i} className="stat-card">
              <div className="gradient-ocean w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

  </div>
);

export default Home;
