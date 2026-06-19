import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trendData, compareData, countries } from "@/data/tourismData";

const indicators = [
  { label: "2024 Arrivals", value: "1.4B", change: "+8.5%", up: true },
  { label: "2024 Revenue", value: "$1.7T", change: "+6.9%", up: true },
  { label: "COVID Recovery", value: "96%", change: "+34.4%", up: true },
  { label: "2020 Drop", value: "-72.6%", change: "Pandemic", up: false },
];

const metrics = ["arrivals", "revenue", "employment", "literacy", "visitors"] as const;
const metricLabels: Record<string, string> = {
  arrivals: "Tourism Arrivals (M)",
  revenue: "Revenue ($B)",
  employment: "Employment (%)",
  literacy: "Literacy (%)",
  visitors: "Visitors (M)",
};
const metricColors: Record<string, string> = {
  arrivals: "hsl(210, 90%, 45%)",
  revenue: "hsl(175, 60%, 45%)",
  employment: "hsl(195, 70%, 50%)",
  literacy: "hsl(140, 60%, 45%)",
  visitors: "hsl(30, 80%, 55%)",
};

const TrendsCompare = () => {
  const [activeTab, setActiveTab] = useState("trends");
  const [selected, setSelected] = useState<string[]>(["France", "USA", "India", "Thailand"]);

  const toggle = (c: string) => {
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : prev.length < 6 ? [...prev, c] : prev
    );
  };

  const data = compareData.filter((d) => selected.includes(d.country));

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-heading mb-2">
          Trends & <span className="gradient-ocean-text">Comparison</span>
        </h1>
        <p className="text-muted-foreground mb-8">Analyze global tourism trends and compare countries side by side.</p>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="trends" className="gap-2"><TrendingUp className="h-4 w-4" /> Trends</TabsTrigger>
            <TabsTrigger value="compare" className="gap-2"><TrendingUp className="h-4 w-4" /> Compare</TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {indicators.map((ind) => (
                <div key={ind.label} className="stat-card">
                  <p className="text-sm text-muted-foreground">{ind.label}</p>
                  <p className="text-2xl font-display font-bold">{ind.value}</p>
                  <div className={`flex items-center gap-1 text-sm font-medium ${ind.up ? "text-accent" : "text-destructive"}`}>
                    {ind.up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {ind.change}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-4">Tourism Arrivals Over Years</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="arrivals" stroke="hsl(210,90%,45%)" strokeWidth={3} dot={{ r: 4 }} name="Arrivals (M)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-4">Revenue Growth Over Years</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(195,70%,50%)" strokeWidth={3} dot={{ r: 4 }} name="Revenue ($B)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-4">Year-over-Year Growth Rate (%)</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="growth" stroke="hsl(175,60%,45%)" strokeWidth={3} dot={{ r: 4 }} name="Growth %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 mt-10">
              <h3 className="font-display font-semibold text-lg mb-3">Trend Analysis Summary</h3>
              <div className="text-muted-foreground space-y-2 text-sm">
                <p>📈 Global tourism has shown consistent growth from 2015-2019, with arrivals increasing from 1.19B to 1.46B.</p>
                <p>🦠 The COVID-19 pandemic caused an unprecedented 72.6% decline in 2020.</p>
                <p>🔄 Recovery has been strong — by 2024, arrivals reached 96% of pre-pandemic levels.</p>
                <p>💰 Revenue recovered to $1.7T in 2024 with a GDP contribution of 9.9%.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compare">
            <p className="text-muted-foreground mb-6">Select up to 6 countries to compare tourism metrics.</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => toggle(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected.includes(c)
                      ? "gradient-ocean text-primary-foreground"
                      : "glass-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {data.length > 0 && (
              <div className="grid lg:grid-cols-1 gap-8">
                {metrics.map((m) => (
                  <div key={m} className="glass-card rounded-2xl p-6">
                    <h3 className="font-display font-semibold mb-4">{metricLabels[m]}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={m} fill={metricColors[m]} radius={[6, 6, 0, 0]} name={metricLabels[m]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default TrendsCompare;
