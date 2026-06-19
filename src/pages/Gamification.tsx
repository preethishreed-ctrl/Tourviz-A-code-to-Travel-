import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Star, Flame, MapPin, Globe2, TrendingUp, Zap, CheckCircle2, Lock, Award, Compass, BarChart3, MessageSquare, Map } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useExplorer } from "@/context/ExplorerContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { compareData } from "@/data/tourismData";

// --- Badges ---
const badges = [
  { id: "explorer-5", name: "Explorer Rookie", desc: "Add 5 destinations to Explorer List", icon: MapPin, threshold: 5, type: "explorer" },
  { id: "explorer-10", name: "Wanderlust Pro", desc: "Add 10 destinations to Explorer List", icon: Globe2, threshold: 10, type: "explorer" },
  { id: "explorer-3", name: "First Steps", desc: "Add 3 destinations to Explorer List", icon: Compass, threshold: 3, type: "explorer" },
  { id: "simulator", name: "What-If Wizard", desc: "Run a simulation scenario", icon: Zap, threshold: 1, type: "action" },
  { id: "compare", name: "Data Analyst", desc: "Compare 3+ countries", icon: TrendingUp, threshold: 3, type: "action" },
  { id: "planner", name: "Tour Planner", desc: "Create a tour plan", icon: Map, threshold: 1, type: "action" },
  { id: "all-pages", name: "Full Tour", desc: "Visit all pages", icon: Star, threshold: 8, type: "action" },
  { id: "streak-3", name: "Hat Trick", desc: "Add 3 destinations in a session", icon: Award, threshold: 3, type: "explorer" },
  { id: "chatbot", name: "Curious Mind", desc: "Use the tourism chatbot", icon: MessageSquare, threshold: 1, type: "action" },
  { id: "dashboard", name: "Data Explorer", desc: "Visit the dashboard", icon: BarChart3, threshold: 1, type: "action" },
];

const levels = [
  { name: "Tourist", min: 0, color: "text-muted-foreground" },
  { name: "Traveler", min: 50, color: "text-primary" },
  { name: "Explorer", min: 150, color: "text-secondary" },
  { name: "Navigator", min: 300, color: "text-accent" },
  { name: "Ambassador", min: 500, color: "text-amber-500" },
  { name: "Globetrotter", min: 750, color: "text-emerald-500" },
];

// --- Tour Planner destinations ---
const tourDestinations = compareData.map(c => c.country);

interface TourDay {
  day: number;
  destination: string;
  activities: string;
  budget: number;
}

const Gamification = () => {
  const { count } = useExplorer();
  const [activeTab, setActiveTab] = useState("achievements");
  
  // Tour Planner state
  const [tourName, setTourName] = useState("");
  const [tourDays, setTourDays] = useState<TourDay[]>([
    { day: 1, destination: "France", activities: "Visit Eiffel Tower, Louvre Museum", budget: 250 },
    { day: 2, destination: "France", activities: "Palace of Versailles, Seine River Cruise", budget: 200 },
    { day: 3, destination: "Italy", activities: "Colosseum, Roman Forum", budget: 220 },
  ]);
  const [planGenerated, setPlanGenerated] = useState(false);

  // XP calculation
  const xp = count * 15 + (planGenerated ? 80 : 0);
  const currentLevel = [...levels].reverse().find(l => xp >= l.min) || levels[0];
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progress = nextLevel ? ((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100 : 100;

  const unlockedBadges = badges.filter(b => {
    if (b.type === "explorer") return count >= b.threshold;
    if (b.id === "planner") return planGenerated;
    return false;
  });

  const addDay = () => {
    setTourDays(prev => [...prev, { day: prev.length + 1, destination: "France", activities: "", budget: 150 }]);
  };

  const removeDay = (idx: number) => {
    setTourDays(prev => prev.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 })));
  };

  const updateDay = (idx: number, field: keyof TourDay, value: string | number) => {
    setTourDays(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d));
  };

  const totalBudget = tourDays.reduce((sum, d) => sum + d.budget, 0);

  const generatePlanReport = () => {
    setPlanGenerated(true);
    toast.success("Tour plan generated! 🗺️");
  };

  const downloadPlanReport = () => {
    const content = `
TOUR PLAN REPORT
================
Tour: ${tourName || "My Tour"}
Generated: ${new Date().toLocaleDateString()}
Total Days: ${tourDays.length}
Total Budget: $${totalBudget.toLocaleString()}

ITINERARY
---------
${tourDays.map(d => `Day ${d.day}: ${d.destination}
  Activities: ${d.activities || "Free exploration"}
  Budget: $${d.budget}
`).join("\n")}

BUDGET BREAKDOWN
----------------
Average per day: $${Math.round(totalBudget / tourDays.length)}
Destinations covered: ${[...new Set(tourDays.map(d => d.destination))].join(", ")}

TRAVEL TIPS
-----------
1. Book accommodations in advance for peak seasons
2. Consider travel insurance for international trips
3. Research local customs and visa requirements
4. Keep digital copies of important documents
5. Budget extra 15-20% for unexpected expenses
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(tourName || "My_Tour").replace(/\s+/g, "_")}_Plan.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Tour plan downloaded!");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="h-8 w-8 text-amber-500" />
          <h1 className="section-heading gradient-ocean-text">Achievements & Tour Planner</h1>
        </div>
        <p className="text-muted-foreground mb-8">Track your progress and plan your dream tour</p>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="achievements" className="gap-2"><Trophy className="h-4 w-4" /> Achievements</TabsTrigger>
            <TabsTrigger value="planner" className="gap-2"><Map className="h-4 w-4" /> Tour Planner</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements">
            {/* Level Progress */}
            <Card className="mb-8 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-ocean flex items-center justify-center">
                      <Flame className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className={`font-display font-bold text-lg ${currentLevel.color}`}>{currentLevel.name}</h3>
                      <p className="text-xs text-muted-foreground">{xp} XP earned</p>
                    </div>
                  </div>
                  {nextLevel && (
                    <p className="text-sm text-muted-foreground">Next: <span className="font-semibold">{nextLevel.name}</span> ({nextLevel.min} XP)</p>
                  )}
                </div>
                <Progress value={progress} className="h-3" />
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">{count}</p>
                  <p className="text-xs text-muted-foreground mt-1">Destinations Added</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">{unlockedBadges.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Badges Earned</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">{xp}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total XP</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">{levels.indexOf(currentLevel) + 1}/{levels.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Level</p>
                </CardContent>
              </Card>
            </div>

            {/* Badges Grid */}
            <h3 className="font-display font-semibold text-lg mb-4">Badges Collection</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((b, i) => {
                const unlocked = unlockedBadges.includes(b);
                return (
                  <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                    <Card className={`transition-all ${unlocked ? "border-primary/30 bg-primary/5" : "opacity-60"}`}>
                      <CardContent className="pt-6 flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${unlocked ? "gradient-ocean" : "bg-muted"}`}>
                          {unlocked ? <b.icon className="h-6 w-6 text-primary-foreground" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                        </div>
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {b.name}
                            {unlocked && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Tips */}
            <Card className="mt-8 bg-muted/30">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> How to earn XP</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Add destinations to your Explorer List (+15 XP each)</li>
                  <li>• Create a tour plan (+80 XP)</li>
                  <li>• Run scenario simulations</li>
                  <li>• Explore all pages of the platform</li>
                  <li>• Use the tourism chatbot</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planner">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Config */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Plan Your Tour</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tour Name</label>
                    <Input value={tourName} onChange={e => setTourName(e.target.value)} placeholder="e.g., European Adventure" />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium block">Itinerary</label>
                    {tourDays.map((day, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-muted/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-primary">Day {day.day}</span>
                          {tourDays.length > 1 && (
                            <button onClick={() => removeDay(idx)} className="text-xs text-destructive hover:underline">Remove</button>
                          )}
                        </div>
                        <Select value={day.destination} onValueChange={v => updateDay(idx, "destination", v)}>
                          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {tourDestinations.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Input className="h-8 text-xs" placeholder="Activities..." value={day.activities} onChange={e => updateDay(idx, "activities", e.target.value)} />
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">$</span>
                          <Input className="h-8 text-xs" type="number" value={day.budget} onChange={e => updateDay(idx, "budget", Number(e.target.value))} />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addDay} className="w-full">+ Add Day</Button>
                  </div>

                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Budget</span>
                      <span className="font-bold text-primary">${totalBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-bold text-primary">{tourDays.length} days</span>
                    </div>
                  </div>

                  <Button onClick={generatePlanReport} className="w-full gap-2">
                    <Map className="h-4 w-4" /> Generate Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Tour Plan Preview</CardTitle>
                    {planGenerated && (
                      <Button size="sm" variant="outline" onClick={downloadPlanReport} className="gap-1.5">
                        Download .txt
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {planGenerated ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <h3 className="font-display font-bold text-lg mb-1">{tourName || "My Tour"}</h3>
                        <p className="text-xs text-muted-foreground">{tourDays.length} days • ${totalBudget.toLocaleString()} budget • {[...new Set(tourDays.map(d => d.destination))].length} countries</p>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="glass-card rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-primary">{tourDays.length}</p>
                          <p className="text-xs text-muted-foreground">Days</p>
                        </div>
                        <div className="glass-card rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-primary">${totalBudget.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Total Budget</p>
                        </div>
                        <div className="glass-card rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-primary">${Math.round(totalBudget / tourDays.length)}</p>
                          <p className="text-xs text-muted-foreground">Avg/Day</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Daily Itinerary</h4>
                        {tourDays.map((day, idx) => (
                          <div key={idx} className="flex gap-4 items-start p-3 rounded-xl bg-muted/30">
                            <div className="w-10 h-10 rounded-lg gradient-ocean flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                              {day.day}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{day.destination}</p>
                              <p className="text-xs text-muted-foreground">{day.activities || "Free exploration"}</p>
                              <p className="text-xs font-medium text-primary mt-1">${day.budget}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-16 text-muted-foreground">
                      <Map className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>Configure your tour and click "Generate Plan" to preview</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Gamification;
