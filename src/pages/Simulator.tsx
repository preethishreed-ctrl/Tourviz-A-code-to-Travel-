import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { Briefcase, GraduationCap, Leaf, TrendingUp, DollarSign, Users, RotateCcw, Zap } from "lucide-react";

const baseValues = { employment: 65, literacy: 88, environment: 72, infrastructure: 60, safety: 75 };

const Simulator = () => {
  const [values, setValues] = useState({ ...baseValues });

  const predictions = useMemo(() => {
    const empDelta = (values.employment - baseValues.employment) * 0.35;
    const litDelta = (values.literacy - baseValues.literacy) * 0.25;
    const envDelta = (values.environment - baseValues.environment) * 0.20;
    const infraDelta = (values.infrastructure - baseValues.infrastructure) * 0.30;
    const safeDelta = (values.safety - baseValues.safety) * 0.28;

    const tourismGrowth = +(empDelta + litDelta + envDelta + infraDelta + safeDelta).toFixed(1);
    const gdpImpact = +(tourismGrowth * 0.25).toFixed(1);
    const revenueChange = +(tourismGrowth * 1.8).toFixed(1);
    const jobsCreated = Math.round(tourismGrowth * 12000);
    const visitorChange = +(tourismGrowth * 0.8).toFixed(1);

    return { tourismGrowth, gdpImpact, revenueChange, jobsCreated, visitorChange };
  }, [values]);

  const radarData = [
    { metric: "Employment", value: values.employment, baseline: baseValues.employment },
    { metric: "Literacy", value: values.literacy, baseline: baseValues.literacy },
    { metric: "Environment", value: values.environment, baseline: baseValues.environment },
    { metric: "Infrastructure", value: values.infrastructure, baseline: baseValues.infrastructure },
    { metric: "Safety", value: values.safety, baseline: baseValues.safety },
  ];

  const impactData = [
    { name: "Tourism Growth", value: predictions.tourismGrowth, fill: "hsl(210, 90%, 45%)" },
    { name: "GDP Impact", value: predictions.gdpImpact, fill: "hsl(175, 60%, 45%)" },
    { name: "Revenue", value: predictions.revenueChange, fill: "hsl(195, 70%, 50%)" },
    { name: "Visitors", value: predictions.visitorChange, fill: "hsl(30, 80%, 55%)" },
  ];

  const sliders = [
    { key: "employment" as const, label: "Employment Rate", icon: Briefcase, color: "text-primary" },
    { key: "literacy" as const, label: "Literacy Rate", icon: GraduationCap, color: "text-secondary" },
    { key: "environment" as const, label: "Environmental Score", icon: Leaf, color: "text-accent" },
    { key: "infrastructure" as const, label: "Infrastructure Index", icon: TrendingUp, color: "text-amber-500" },
    { key: "safety" as const, label: "Safety Index", icon: Zap, color: "text-emerald-500" },
  ];

  const isChanged = JSON.stringify(values) !== JSON.stringify(baseValues);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Zap className="h-8 w-8 text-primary" />
          <h1 className="section-heading gradient-ocean-text">What If? Simulator</h1>
        </div>
        <p className="text-muted-foreground mb-8">Adjust socio-economic factors and predict tourism impact in real-time</p>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Adjust Parameters</CardTitle>
                  {isChanged && (
                    <Button size="sm" variant="ghost" onClick={() => setValues({ ...baseValues })} className="gap-1.5">
                      <RotateCcw className="h-3.5 w-3.5" /> Reset
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {sliders.map(s => (
                  <div key={s.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <s.icon className={`h-4 w-4 ${s.color}`} />
                        {s.label}
                      </label>
                      <span className="text-sm font-bold text-primary">{values[s.key]}%</span>
                    </div>
                    <Slider
                      value={[values[s.key]]}
                      onValueChange={([v]) => setValues(prev => ({ ...prev, [s.key]: v }))}
                      min={20}
                      max={100}
                      step={1}
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>Baseline: {baseValues[s.key]}%</span>
                      <span className={values[s.key] > baseValues[s.key] ? "text-emerald-500" : values[s.key] < baseValues[s.key] ? "text-destructive" : ""}>
                        {values[s.key] > baseValues[s.key] ? "+" : ""}{values[s.key] - baseValues[s.key]}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Prediction Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Tourism Growth", value: `${predictions.tourismGrowth > 0 ? "+" : ""}${predictions.tourismGrowth}%`, icon: TrendingUp, positive: predictions.tourismGrowth > 0 },
                { label: "GDP Impact", value: `${predictions.gdpImpact > 0 ? "+" : ""}${predictions.gdpImpact}%`, icon: DollarSign, positive: predictions.gdpImpact > 0 },
                { label: "Revenue Change", value: `${predictions.revenueChange > 0 ? "+" : ""}${predictions.revenueChange}%`, icon: DollarSign, positive: predictions.revenueChange > 0 },
                { label: "Visitor Change", value: `${predictions.visitorChange > 0 ? "+" : ""}${predictions.visitorChange}%`, icon: Users, positive: predictions.visitorChange > 0 },
                { label: "Jobs Impact", value: `${predictions.jobsCreated > 0 ? "+" : ""}${predictions.jobsCreated.toLocaleString()}`, icon: Briefcase, positive: predictions.jobsCreated > 0 },
              ].map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <p.icon className={`h-5 w-5 mx-auto mb-1 ${p.positive ? "text-emerald-500" : "text-destructive"}`} />
                  <p className={`text-xl font-display font-bold ${p.positive ? "text-emerald-500" : "text-destructive"}`}>{p.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Impact Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis unit="%" />
                      <Tooltip formatter={(v: number) => `${v}%`} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {impactData.map((entry, i) => (
                          <motion.rect key={i} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Parameter Radar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(210,20%,88%)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
                      <Radar name="Current" dataKey="value" stroke="hsl(210, 90%, 45%)" fill="hsl(210, 90%, 45%)" fillOpacity={0.3} />
                      <Radar name="Baseline" dataKey="baseline" stroke="hsl(210, 20%, 70%)" fill="hsl(210, 20%, 70%)" fillOpacity={0.1} strokeDasharray="5 5" />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Insight */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" /> AI Insight
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {predictions.tourismGrowth > 5
                    ? `Strong positive outlook! A ${predictions.tourismGrowth}% tourism growth would generate approximately ${predictions.jobsCreated.toLocaleString()} new jobs and boost GDP by ${predictions.gdpImpact}%. Focus areas: infrastructure development and environmental sustainability will sustain long-term growth.`
                    : predictions.tourismGrowth > 0
                    ? `Moderate growth expected at ${predictions.tourismGrowth}%. Consider improving infrastructure and safety indices to achieve stronger results. Current parameters suggest steady but conservative tourism expansion.`
                    : predictions.tourismGrowth < -5
                    ? `Warning: Parameters indicate a ${Math.abs(predictions.tourismGrowth)}% decline in tourism. Priority actions needed in ${values.employment < baseValues.employment ? "employment" : ""} ${values.safety < baseValues.safety ? "safety" : ""} ${values.environment < baseValues.environment ? "environment" : ""} sectors.`
                    : `Minimal change predicted. Current parameters are close to baseline values. Try adjusting employment rate or infrastructure index for more significant impact.`}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Simulator;
