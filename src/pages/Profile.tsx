import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Calendar, Camera, Edit2, Save, Globe2, Trophy, Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useExplorer } from "@/context/ExplorerContext";
import { toast } from "sonner";

const Profile = () => {
  const { count } = useExplorer();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Alex Traveler",
    email: "alex@tourismviz.com",
    location: "New York, USA",
    bio: "Passionate about exploring the world and analyzing tourism data.",
    joinDate: "March 2026",
    favoriteRegion: "Europe",
    tripsPlanned: 5,
  });

  const handleSave = () => {
    setEditing(false);
    toast.success("Profile updated! ✅");
  };

  const xp = count * 15;
  const levels = ["Tourist", "Traveler", "Explorer", "Navigator", "Ambassador", "Globetrotter"];
  const levelIdx = xp >= 750 ? 5 : xp >= 500 ? 4 : xp >= 300 ? 3 : xp >= 150 ? 2 : xp >= 50 ? 1 : 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-heading mb-8 gradient-ocean-text">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Avatar & Quick Info */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full gradient-ocean flex items-center justify-center text-4xl text-primary-foreground font-bold">
                  {profile.fullName.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="font-display font-bold text-lg">{profile.fullName}</h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" /> {profile.location}
              </p>

              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Compass className="h-3.5 w-3.5" /> Destinations</span>
                  <span className="text-sm font-bold text-primary">{count}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5" /> Level</span>
                  <span className="text-sm font-bold text-primary">{levels[levelIdx]}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5" /> XP</span>
                  <span className="text-sm font-bold text-primary">{xp}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Account Details</CardTitle>
                <Button size="sm" variant={editing ? "default" : "outline"} onClick={() => editing ? handleSave() : setEditing(true)} className="gap-1.5">
                  {editing ? <><Save className="h-3.5 w-3.5" /> Save</> : <><Edit2 className="h-3.5 w-3.5" /> Edit</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Full Name</label>
                  {editing ? (
                    <Input value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })} />
                  ) : (
                    <p className="text-sm text-muted-foreground p-2.5">{profile.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email</label>
                  {editing ? (
                    <Input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                  ) : (
                    <p className="text-sm text-muted-foreground p-2.5">{profile.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Location</label>
                  {editing ? (
                    <Input value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} />
                  ) : (
                    <p className="text-sm text-muted-foreground p-2.5">{profile.location}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5" /> Favorite Region</label>
                  {editing ? (
                    <Input value={profile.favoriteRegion} onChange={e => setProfile({ ...profile, favoriteRegion: e.target.value })} />
                  ) : (
                    <p className="text-sm text-muted-foreground p-2.5">{profile.favoriteRegion}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Bio</label>
                {editing ? (
                  <Input value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
                ) : (
                  <p className="text-sm text-muted-foreground p-2.5">{profile.bio}</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                <Calendar className="h-3.5 w-3.5" /> Joined {profile.joinDate}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
