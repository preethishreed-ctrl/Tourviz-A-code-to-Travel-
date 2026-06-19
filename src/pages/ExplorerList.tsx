import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExplorer } from "@/context/ExplorerContext";
import { Trash2, MapPin, Star, DollarSign, Users, ShoppingBag, ArrowRight, Map, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { compareData } from "@/data/tourismData";

const tourDestinations = compareData.map(c => c.country);

interface TourDay {
  day: number;
  destination: string;
  activities: string;
  budget: number;
}

const ExplorerList = () => {
  const { items, removeItem, clearAll, count } = useExplorer();
  const [activeTab, setActiveTab] = useState("explorer");

  // Tour Planner state
  const [tourName, setTourName] = useState("");
  const [tourDays, setTourDays] = useState<TourDay[]>([
    { day: 1, destination: "France", activities: "Visit Eiffel Tower, Louvre Museum", budget: 250 },
    { day: 2, destination: "France", activities: "Palace of Versailles, Seine River Cruise", budget: 200 },
    { day: 3, destination: "Italy", activities: "Colosseum, Roman Forum", budget: 220 },
  ]);
  const [planGenerated, setPlanGenerated] = useState(false);

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
          <Compass className="h-8 w-8 text-primary" />
          <h1 className="section-heading gradient-ocean-text">Explorer & Planner</h1>
        </div>
        <p className="text-muted-foreground mb-8">Manage your saved destinations and plan your dream tour</p>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="explorer" className="gap-2"><Compass className="h-4 w-4" /> Explorer List {count > 0 && `(${count})`}</TabsTrigger>
            <TabsTrigger value="planner" className="gap-2"><Map className="h-4 w-4" /> Tour Planner</TabsTrigger>
          </TabsList>

          <TabsContent value="explorer">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {count > 0
                  ? `You have ${count} destination${count > 1 ? "s" : ""} in your explorer list.`
                  : "Your explorer list is empty. Add destinations from the Destination Explorer!"}
              </p>
              {count > 0 && (
                <button onClick={clearAll} className="text-sm text-destructive hover:underline flex items-center gap-1">
                  <Trash2 className="h-4 w-4" /> Clear All
                </button>
              )}
            </div>

            {count === 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-12 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">No destinations yet</h3>
                <p className="text-muted-foreground text-sm mb-6">Browse destinations and add them to your explorer list.</p>
                <Link to="/destinations" className="inline-flex items-center gap-2 gradient-ocean text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Explore Destinations <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }} className="glass-card rounded-2xl p-5 relative group">
                    <button onClick={() => removeItem(item.id)} className="absolute top-3 right-3 p-2 rounded-lg bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20" title="Remove from list">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="gradient-ocean w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-base">{item.name}</h3>
                        <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 rounded-full bg-muted">{item.type}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {item.rating && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Star className="h-3.5 w-3.5 text-amber-500" />
                          <span>Rating: <strong className="text-foreground">{item.rating}</strong></span>
                        </div>
                      )}
                      {item.visitors && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-3.5 w-3.5 text-primary" />
                          <span>Visitors: <strong className="text-foreground">{item.visitors}</strong></span>
                        </div>
                      )}
                      {item.revenue && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Revenue: <strong className="text-foreground">{item.revenue}</strong></span>
                        </div>
                      )}
                    </div>
                    {item.note && (
                      <p className="mt-3 text-xs text-muted-foreground italic border-t border-border/50 pt-2">{item.note}</p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="planner">
            <div className="grid lg:grid-cols-3 gap-8">
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

              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Tour Plan Preview</CardTitle>
                    {planGenerated && (
                      <Button size="sm" variant="outline" onClick={downloadPlanReport} className="gap-1.5">Download .txt</Button>
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
                            <div className="w-10 h-10 rounded-lg gradient-ocean flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">{day.day}</div>
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

export default ExplorerList;
