import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, ScatterChart, Scatter
} from "recharts";
import { Users, Star, FileCheck, Globe2, TrendingUp, DollarSign, Briefcase, GraduationCap, Plane, Hotel, ThumbsUp, PlusCircle, CheckCircle2, Info } from "lucide-react";
import {
  topCountriesByVisitors, visaDistribution, gdpData, covidEffectsOnLocation, weatherVisitors,
  revenueData, revenueByDestination, revenueBudget, estimationStats, gdpContributionScatter,
  employmentByCountry, wasteManagement, tourismSeclusionByRegion, warPeaceImpact,
  topRatedDestinations, co2Data, literacyInfluencers
} from "@/data/tourismData";
import { useExplorer, type ExplorerItem } from "@/context/ExplorerContext";
import { toast } from "sonner";
import refOverview from "@/assets/ref-overview.jpg";
import refRevenue from "@/assets/ref-revenue.png";
import refInsights from "@/assets/ref-insights.jpg";
import refSocio from "@/assets/ref-socio.jpg";

const AddToExplorerBtn = ({ item }: { item: ExplorerItem }) => {
  const { addItem, removeItem, isInList } = useExplorer();
  const added = isInList(item.id);

  const handleClick = () => {
    if (added) {
      removeItem(item.id);
      toast.info(`Removed ${item.name} from Explorer List`);
    } else {
      addItem(item);
      toast.success(`Added ${item.name} to Explorer List! 🌍`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        added
          ? "bg-primary/15 text-primary"
          : "bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary"
      }`}
    >
      {added ? <CheckCircle2 className="h-3.5 w-3.5" /> : <PlusCircle className="h-3.5 w-3.5" />}
      {added ? "Added" : "Add to Explorer"}
    </button>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color?: string }) => (
  <div className="glass-card rounded-xl flex items-center gap-4 p-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color || "gradient-ocean"}`}>
      <Icon className="h-6 w-6 text-primary-foreground" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-display font-bold">{value}</p>
    </div>
  </div>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-8">
    <h2 className="section-heading gradient-ocean-text">{title}</h2>
    <p className="text-muted-foreground mt-1">{subtitle}</p>
  </div>
);

const ChartDescription = ({ description }: { description: string }) => (
  <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border/50">
    <div className="flex items-start gap-2">
      <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

const DashboardRefImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-border/30">
    <div className="bg-muted/50 px-4 py-2 text-xs text-muted-foreground font-medium flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-destructive inline-block" />
      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
      <span className="ml-2">Power BI Reference — {alt}</span>
    </div>
    <img src={src} alt={alt} className="w-full" />
  </div>
);

const chartColors = {
  primary: "hsl(210, 90%, 45%)",
  secondary: "hsl(195, 70%, 50%)",
  accent: "hsl(175, 60%, 45%)",
  muted: "hsl(220, 60%, 60%)",
  warm: "hsl(30, 80%, 55%)",
  danger: "hsl(0, 70%, 55%)",
  teal: "hsl(180, 60%, 40%)",
  green: "hsl(140, 60%, 45%)",
};

const Dashboard = () => (
  <div className="container mx-auto px-4 py-12 space-y-20">
    {/* Dashboard 1: Tourism Overview */}
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <SectionTitle title="Tourist Arrivals & Visa Distribution" subtitle="Global tourism metrics, top countries by visitors, and visa breakdown" />
      <DashboardRefImage src={refOverview} alt="Tourist Arrivals & Visa Distribution" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Visitors" value="2.513bn" color="gradient-ocean" />
        <StatCard icon={Star} label="Average Rating" value="3.95" color="bg-amber-500" />
        <StatCard icon={FileCheck} label="Visa Volume" value="62bn" color="bg-sky-600" />
        <StatCard icon={Globe2} label="Tourism Arrivals" value="310.00bn" color="bg-emerald-600" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Top Countries By Visitors</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {topCountriesByVisitors.map((c) => (
              <AddToExplorerBtn
                key={c.country}
                item={{ id: `country-${c.country}`, name: c.country, type: "country", visitors: `${c.visitors}M` }}
              />
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCountriesByVisitors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} unit="M" />
              <YAxis dataKey="country" type="category" width={90} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `${v}M`} />
              <Bar dataKey="visitors" fill={chartColors.primary} radius={[0, 6, 6, 0]} name="Visitors (M)" />
            </BarChart>
          </ResponsiveContainer>
          <ChartDescription description="This horizontal bar chart ranks the top countries by the number of international visitors. Countries like Korea, San Marino, and Montenegro lead in visitor numbers. High visitor counts indicate strong tourism appeal driven by cultural attractions, infrastructure, and marketing. Understanding which countries attract the most tourists helps policymakers and businesses allocate resources effectively for tourism development." />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Visa Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={visaDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${value}%`}>
                {visaDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <ChartDescription description="This pie chart shows the distribution of visa types used by international tourists. The four categories — Visa On Arrival, Tourist Visa, E-Visa, and Schengen — are almost equally distributed, each representing approximately 25%. This indicates a balanced global visa system where multiple entry options are available to travelers. E-Visa and Visa On Arrival policies have significantly boosted tourism by reducing travel barriers and simplifying entry processes for international visitors." />
        </div>
      </div>
      <div className="glass-card rounded-2xl p-6 mt-6">
        <h3 className="font-display font-semibold mb-2 text-primary">Map Visualization</h3>
        <ChartDescription description="The interactive map displays visitor distribution across countries using bubble markers. Each bubble represents the volume of visitors to that country, with larger bubbles indicating higher tourist arrivals. This geographic visualization helps identify tourism hotspots globally — countries like France (9.9M), Korea (10.2M), and Brazil (8.7M) show significant tourism activity. The map provides an intuitive way to understand global tourism patterns and regional concentrations of travel activity." />
      </div>
    </motion.section>

    {/* Dashboard 2: Revenue Analysis */}
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <SectionTitle title="Revenue Analysis" subtitle="Total revenue, trends, budget breakdown, and destination performance" />
      <DashboardRefImage src={refRevenue} alt="Revenue Analysis" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-2xl font-display font-bold text-primary">₹26bn</p>
          <p className="text-xs text-muted-foreground">Sum of revenue</p>
        </div>
        {estimationStats.map(s => (
          <div key={s.label} className="glass-card rounded-xl p-4 text-center">
            <p className="text-lg font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="year" />
              <YAxis unit="bn" />
              <Tooltip formatter={(v: number) => `${v}bn`} />
              <Area type="monotone" dataKey="revenue" stroke={chartColors.teal} fill={chartColors.teal} fillOpacity={0.3} name="Revenue (bn)" />
            </AreaChart>
          </ResponsiveContainer>
          <ChartDescription description="This area chart tracks tourism revenue over the years, showing an overall upward trend. Revenue has grown from approximately 10bn in 2005 to over 20bn in recent years, with the total sum reaching ₹26bn. The steady increase reflects growing global tourism demand, better infrastructure, and more diversified tourism offerings. Dips in certain years may correspond to global events like economic recessions or the COVID-19 pandemic, but the recovery trend demonstrates the resilience of the tourism industry." />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Revenue By Destination</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueByDestination}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="destination" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="revenue" fill={chartColors.primary} radius={[4, 4, 0, 0]} name="Revenue %" />
            </BarChart>
          </ResponsiveContainer>
          <ChartDescription description="This bar chart compares revenue generated by different tourist destinations worldwide. Iconic landmarks like the Eiffel Tower, Times Square, and Machu Picchu contribute significantly to tourism revenue. The chart helps identify which destinations are the strongest revenue generators, guiding investment decisions and marketing strategies. High-revenue destinations typically benefit from strong brand recognition, accessibility, and supporting infrastructure like hotels and restaurants." />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Contribution to GDP Percent</h3>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="gdp" name="GDP %" unit="%" />
              <YAxis dataKey="months" name="Months" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={gdpContributionScatter} fill={chartColors.primary} name="GDP vs Months" />
            </ScatterChart>
          </ResponsiveContainer>
          <ChartDescription description="This scatter plot visualizes the relationship between GDP contribution percentage and tourism activity over months. Each dot represents a data point showing how tourism contributes to a country's GDP. The scattered distribution indicates that GDP contribution varies widely across different countries and time periods. Countries with higher tourism dependency show stronger GDP correlation, while diversified economies show more moderate tourism GDP contributions. This analysis helps understand the economic importance of tourism at a national level." />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Revenue By Budget</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={revenueBudget} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label={({ name, value }) => `${name}: ${value}%`}>
                {revenueBudget.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <ChartDescription description="This donut chart breaks down tourism revenue by budget categories — High, Medium, and Low. Each category contributes equally at approximately 33.33% (560 each), suggesting a balanced distribution of tourism spending across different budget levels. This means tourism caters to all types of travelers, from budget backpackers to luxury tourists. A balanced revenue distribution indicates a healthy tourism ecosystem that doesn't over-rely on any single market segment." />
        </div>
      </div>
      <div className="glass-card rounded-2xl p-6 mt-6">
        <h3 className="font-display font-semibold mb-2 text-primary">Estimation Statistics</h3>
        <ChartDescription description="The estimation panel displays key aggregate metrics: 1,378,334 flights, 62,631,942 tourists, 136,812 hotels, and a tourist satisfaction score of 3,719. These numbers provide a comprehensive snapshot of the tourism industry's scale and performance. The high number of flights and tourists indicates a thriving global travel market, while the satisfaction score helps gauge overall visitor experience quality across destinations." />
      </div>
    </motion.section>

    {/* Dashboard 3: Tourism Data Insights */}
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <SectionTitle title="Tourism Data Insights Dashboard" subtitle="Rating, GDP, weather, COVID effects, top destinations, and emissions" />
      <DashboardRefImage src={refInsights} alt="Tourism Data Insights" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-xl p-4 text-center">
          <Star className="h-8 w-8 text-amber-500 mx-auto mb-1" />
          <p className="text-2xl font-display font-bold text-primary">39.51K</p>
          <p className="text-xs text-muted-foreground">Sum of rating</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">GDP WRT Year</h3>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="gdp" name="Sum of GDP" unit="M" />
              <YAxis dataKey="visitors" name="Visitors" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={gdpData} fill={chartColors.primary} name="GDP vs Visitors" />
            </ScatterChart>
          </ResponsiveContainer>
          <ChartDescription description="This scatter chart shows the correlation between GDP and visitor numbers across different years. As GDP increases, the number of tourists tends to rise as well, confirming that economic growth drives tourism development. Countries with higher GDP can invest more in tourism infrastructure, marketing, and services, which attracts more visitors. The upward trend in the scatter plot validates the strong positive relationship between national wealth and tourism performance." />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Visitors By Weather</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weatherVisitors}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="weather" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visitors" fill={chartColors.secondary} radius={[6, 6, 0, 0]} name="Visitors" />
            </BarChart>
          </ResponsiveContainer>
          <ChartDescription description="This bar chart displays the number of visitors based on weather conditions — Clear, Cloudy, Drizzle, Light rain, Dusty, Rainy, Fog, Snowy, and Stormy. Clear and cloudy weather conditions attract the highest number of visitors (4,000-5,000), while extreme weather like storms and heavy fog significantly reduce tourist arrivals. This data is crucial for tourism planning, as it helps destinations prepare for seasonal variations and develop weather-appropriate attractions and activities." />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Covid 19 Effects on Location</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={covidEffectsOnLocation}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="location" tick={{ fontSize: 9 }} angle={-20} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="full" stackId="a" fill={chartColors.primary} name="Full Lockdown" />
              <Bar dataKey="partial" stackId="a" fill={chartColors.accent} name="Partial Lockdown" />
            </BarChart>
          </ResponsiveContainer>
          <ChartDescription description="This stacked bar chart compares the impact of COVID-19 lockdowns on tourism across different regions — Africa, Australasia, Central and East Asia, and others. The chart distinguishes between full lockdown (complete travel ban) and partial lockdown (restricted travel) effects. Regions with full lockdowns experienced the most severe tourism decline, while partial lockdowns allowed some tourism activity to continue. This visualization highlights how pandemic policies directly affected tourism revenue and visitor numbers across the globe." />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-2 text-primary">Top Rated Destinations</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {topRatedDestinations.slice(0, 5).map((d) => (
              <AddToExplorerBtn
                key={d.place}
                item={{ id: `dest-${d.place}`, name: d.place, type: "destination", rating: d.rating }}
              />
            ))}
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topRatedDestinations} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis type="number" domain={[0, 10]} />
              <YAxis dataKey="place" type="category" width={80} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="rating" fill={chartColors.primary} radius={[0, 6, 6, 0]} name="Rating" />
            </BarChart>
          </ResponsiveContainer>
          <ChartDescription description="This horizontal bar chart ranks the top 10 tourist destinations by their rating score on a scale of 1-10. The top-rated destination scores a perfect 10, followed by Barcelona (9), New York (8), Rome (6), Bangkok (5), Dubai (5), Paris (5), Singapore (4), Tokyo (3), and Athens (3). These ratings are based on factors like visitor satisfaction, attractions, safety, accessibility, and overall experience. The rankings help travelers make informed decisions and guide tourism boards in improving their destinations." />
        </div>
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4 text-primary">CO₂ Emissions Rate</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {co2Data.map(d => (
            <div key={d.year} className="text-center p-4 rounded-xl bg-muted/40">
              <p className="text-lg font-bold text-primary">{d.year}</p>
              <p className="text-2xl font-display font-bold">{d.emissions}</p>
              <p className="text-xs text-muted-foreground">MT CO₂</p>
            </div>
          ))}
        </div>
        <ChartDescription description="This treemap-style visualization displays CO₂ emission rates across different years — 2023 (1950 MT), 2022 (1990 MT), 2021 (1920 MT), and 2010 (1950 MT). The data shows that carbon emissions from tourism-related activities have remained relatively stable over the years. Tourism contributes significantly to global carbon emissions through air travel, hotel energy consumption, and transportation. Understanding these emission patterns is essential for developing sustainable tourism practices and reducing the environmental footprint of the travel industry." />
      </div>
    </motion.section>

    {/* Dashboard 4: Socio-Economic Impact */}
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <SectionTitle title="Global Socio-Economic and Tourism Impact Analysis" subtitle="Employment, unemployment, literacy, and tourism impact analysis" />
      <DashboardRefImage src={refSocio} alt="Global Socio-Economic Analysis" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Briefcase} label="Employment Rate" value="6.47%" />
        <StatCard icon={Users} label="Unemployment Rate" value="4.23%" color="bg-rose-500" />
        <StatCard icon={GraduationCap} label="Literacy Rate" value="86.5%" color="bg-emerald-600" />
        <StatCard icon={TrendingUp} label="Tourism Rate" value="3.12" color="bg-violet-600" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Employment vs Unemployment Rate by Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={employmentByCountry}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="country" tick={{ fontSize: 9 }} angle={-30} textAnchor="end" height={60} />
              <YAxis unit="%" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="employment" stroke={chartColors.primary} strokeWidth={2} name="Emp rate" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="unemployment" stroke={chartColors.danger} strokeWidth={2} name="Unemployment rate" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <ChartDescription description="This line chart compares employment rate (blue line) and unemployment rate (red line) across different countries. Countries with higher employment generally maintain lower unemployment levels, indicating stronger economic stability. For example, countries like China and South Africa have relatively higher employment rates, while unemployment gradually increases in some other countries. This relationship is important for tourism because strong employment indicates a healthy economy, better infrastructure, and more services such as hotels, transport, and tourism businesses. Higher unemployment can reduce tourism development, as economic instability discourages investment and international travel. In simple terms, better employment conditions often support a stronger tourism sector." />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Literacy Rate Influencing Factors</h3>
          <div className="space-y-4 mt-6">
            <p className="text-sm text-muted-foreground mb-4">What influences Literacy Rate to <span className="font-semibold text-foreground">Increase</span></p>
            {literacyInfluencers.map(item => (
              <div key={item.factor} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm">{item.factor}</span>
                <span className="font-bold text-primary text-lg">→ {item.impact}</span>
              </div>
            ))}
          </div>
          <ChartDescription description="This visual identifies the main factors that influence literacy rate improvement. The analysis shows that literacy increases significantly when education spending is high, the country has political stability and peace, and government policies support education. Countries like Afghanistan (+64.9) and Somalia (+58.85) show strong improvements when education investments increase. Education Spending High contributes +23.5 and Peace Index Strong adds +18.2. Literacy is directly connected to tourism because a more educated population improves service quality in tourism industries such as hospitality, guiding, travel management, and communication with international visitors. Therefore, higher literacy supports better tourism experiences and economic growth." />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Waste Management Efficiency by Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteManagement} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis type="number" unit="%" domain={[0, 100]} />
              <YAxis dataKey="country" type="category" width={80} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="efficiency" fill={chartColors.primary} radius={[0, 6, 6, 0]} name="Efficiency %" />
            </BarChart>
          </ResponsiveContainer>
          <ChartDescription description="This bar chart compares waste management efficiency across different countries. Countries like China (92%) and South Africa (88%) show the highest efficiency, while countries such as Egypt (72%) have lower efficiency levels. Waste management is important for tourism because clean and well-maintained environments attract more tourists. Tourists prefer destinations that are environmentally responsible and hygienic. Poor waste management can negatively affect tourism by damaging natural attractions, beaches, and cities. Therefore, environmental sustainability plays a key role in tourism development." />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Tourism Seclusion Index by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tourismSeclusionByRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="region" tick={{ fontSize: 9 }} angle={-30} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="index" stroke={chartColors.primary} strokeWidth={2} name="Seclusion Index" dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
          <ChartDescription description="This graph compares tourism development levels across different world regions. Oceania has the highest tourism seclusion index (8.7), followed by regions such as South America (8.2) and Africa (3.1), while regions like North America and United East have comparatively lower values. The tourism seclusion index represents how attractive and developed tourism infrastructure is in a region. Regions with higher values usually have better natural attractions, tourism policies, and visitor experiences. This helps policymakers understand which regions require more tourism investment and development." />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4 text-primary">Tourism Impact During War and Peace</h3>
          <div className="overflow-auto max-h-[300px]">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b border-border">
                  <th className="text-left p-2">Country</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Year</th>
                  <th className="text-right p-2">Tourism</th>
                </tr>
              </thead>
              <tbody>
                {warPeaceImpact.map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="p-2">{row.country}</td>
                    <td className="p-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${row.type === "conflict" ? "bg-destructive/20 text-destructive" : "bg-emerald-100 text-emerald-700"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-2">{row.year}</td>
                    <td className={`p-2 text-right font-bold ${row.type === "conflict" ? "text-destructive" : "text-emerald-600"}`}>
                      {row.tourism}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ChartDescription description="This table visualizes how conflict situations affect tourism rates. During active war periods, tourism rates are significantly lower, represented by red values. For example, Afghanistan shows low tourism numbers (1.18–2.30) during conflict years (2012–2017). However, during peace or pre-war periods, tourism rates increase significantly (3.42–4.41), shown in green. This clearly demonstrates that political stability is a major factor influencing tourism growth. Tourists usually avoid destinations with war or security risks, which leads to reduced tourism revenue and economic loss for the affected regions." />
        </div>
      </div>
    </motion.section>
  </div>
);

export default Dashboard;
