import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Users, Wallet, Filter, PlusCircle, CheckCircle2, Globe2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useExplorer, type ExplorerItem } from "@/context/ExplorerContext";
import { toast } from "sonner";

const destinations = [
  { id: "dest-eiffel", name: "Eiffel Tower", country: "France", region: "Europe", rating: 4.7, visitors: "7M", expenditure: "€110/day", image: "🗼", tags: ["Landmark", "Romantic"] },
  { id: "dest-times", name: "Times Square", country: "USA", region: "Americas", rating: 4.5, visitors: "50M", expenditure: "$200/day", image: "🌃", tags: ["Urban", "Entertainment"] },
  { id: "dest-taj", name: "Taj Mahal", country: "India", region: "Asia", rating: 4.8, visitors: "8M", expenditure: "₹3,300/day", image: "🕌", tags: ["Heritage", "Wonder"] },
  { id: "dest-colosseum", name: "Colosseum", country: "Italy", region: "Europe", rating: 4.6, visitors: "7.6M", expenditure: "€140/day", image: "🏛️", tags: ["Ancient", "Heritage"] },
  { id: "dest-greatwall", name: "Great Wall", country: "China", region: "Asia", rating: 4.7, visitors: "10M", expenditure: "¥430/day", image: "🏯", tags: ["Wonder", "Heritage"] },
  { id: "dest-machu", name: "Machu Picchu", country: "Peru", region: "Americas", rating: 4.9, visitors: "1.5M", expenditure: "S/320/day", image: "⛰️", tags: ["Ancient", "Adventure"] },
  { id: "dest-sydney", name: "Sydney Opera", country: "Australia", region: "Oceania", rating: 4.5, visitors: "11M", expenditure: "A$270/day", image: "🎭", tags: ["Arts", "Landmark"] },
  { id: "dest-dubai", name: "Burj Khalifa", country: "UAE", region: "Middle East", rating: 4.6, visitors: "2M", expenditure: "AED 920/day", image: "🏙️", tags: ["Modern", "Luxury"] },
  { id: "dest-angkor", name: "Angkor Wat", country: "Cambodia", region: "Asia", rating: 4.8, visitors: "2.6M", expenditure: "៛145,000/day", image: "🛕", tags: ["Ancient", "Spiritual"] },
  { id: "dest-santorini", name: "Santorini", country: "Greece", region: "Europe", rating: 4.7, visitors: "3.4M", expenditure: "€150/day", image: "🏝️", tags: ["Island", "Romantic"] },
  { id: "dest-grandcanyon", name: "Grand Canyon", country: "USA", region: "Americas", rating: 4.8, visitors: "6M", expenditure: "$130/day", image: "🏜️", tags: ["Nature", "Adventure"] },
  { id: "dest-bangkok", name: "Grand Palace", country: "Thailand", region: "Asia", rating: 4.5, visitors: "8M", expenditure: "฿1,575/day", image: "🏰", tags: ["Heritage", "Spiritual"] },
];

const regions = ["All", "Europe", "Asia", "Americas", "Oceania", "Middle East"];

const AddBtn = ({ item }: { item: ExplorerItem }) => {
  const { addItem, removeItem, isInList } = useExplorer();
  const added = isInList(item.id);
  return (
    <Button
      size="sm"
      variant={added ? "default" : "outline"}
      onClick={() => {
        if (added) { removeItem(item.id); toast.info(`Removed ${item.name}`); }
        else { addItem(item); toast.success(`Added ${item.name} to Explorer List! 🌍`); }
      }}
      className="gap-1.5"
    >
      {added ? <CheckCircle2 className="h-3.5 w-3.5" /> : <PlusCircle className="h-3.5 w-3.5" />}
      {added ? "Added" : "Add"}
    </Button>
  );
};

const DestinationExplorer = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = destinations.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === "All" || d.region === region;
    return matchSearch && matchRegion;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Globe2 className="h-8 w-8 text-primary" />
          <h1 className="section-heading gradient-ocean-text">Destination Explorer</h1>
        </div>
        <p className="text-muted-foreground mb-8">Discover and bookmark world-famous destinations</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search destinations or countries..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {regions.map(r => (
              <Button key={r} size="sm" variant={region === r ? "default" : "outline"} onClick={() => setRegion(r)}>
                {r === "All" && <Filter className="h-3.5 w-3.5 mr-1" />}
                {r}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((d, i) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="h-32 gradient-ocean flex items-center justify-center text-5xl">
                  {d.image}
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-lg">{d.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {d.country}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {d.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{t}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <Star className="h-3.5 w-3.5 text-amber-500 mx-auto" />
                      <p className="text-xs font-bold mt-0.5">{d.rating}</p>
                    </div>
                    <div>
                      <Users className="h-3.5 w-3.5 text-primary mx-auto" />
                      <p className="text-xs font-bold mt-0.5">{d.visitors}</p>
                    </div>
                    <div>
                      <Wallet className="h-3.5 w-3.5 text-accent mx-auto" />
                      <p className="text-xs font-bold mt-0.5">{d.expenditure}</p>
                    </div>
                  </div>
                  <AddBtn item={{ id: d.id, name: d.name, type: "destination", rating: d.rating, visitors: d.visitors }} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No destinations found matching your search.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DestinationExplorer;
