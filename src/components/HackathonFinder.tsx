
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface HackathonCardProps {
  name: string;
  location: string;
  date: string;
  distance: string;
  attendees: number;
  theme?: string;
  delay?: number;
}

const HackathonCard = ({
  name,
  location,
  date,
  distance,
  attendees,
  theme,
  delay = 0
}: HackathonCardProps) => {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-hack-blue/20 hover:shadow-md transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-display font-bold text-hack-dark">{name}</h3>
        <span className="text-sm font-medium px-2 py-1 rounded-full bg-hack-blue/10 text-hack-blue">
          {distance}
        </span>
      </div>
      
      <div className="flex items-center text-hack-dark/70 text-sm mb-3">
        <MapPin className="h-4 w-4 mr-1 text-hack-purple" />
        {location}
      </div>
      
      <div className="flex justify-between items-center text-sm text-hack-dark/70 mb-4">
        <span>{date}</span>
        <span>{attendees} attendees</span>
      </div>
      
      {theme && (
        <div className="mt-3 mb-2">
          <span className="text-xs px-3 py-1 rounded-full bg-hack-purple/10 text-hack-purple border border-hack-purple/20">
            {theme}
          </span>
        </div>
      )}
      
      <Button className="w-full mt-3 bg-gradient-to-r from-hack-blue to-hack-purple text-white hover:from-hack-blue/90 hover:to-hack-purple/90">
        View Details
      </Button>
    </div>
  );
};

const HackathonFinder = () => {
  const [zipCode, setZipCode] = useState("");
  const [distance, setDistance] = useState("25");
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  
  const handleSearch = () => {
    if (!zipCode || zipCode.length < 5) {
      toast({
        title: "Please enter a valid ZIP code",
        variant: "destructive",
      });
      return;
    }
    
    setHasSearched(true);
    toast({
      title: "Searching hackathons near you!",
      description: `Finding events within ${distance} miles of ${zipCode}`,
    });
  };
  
  return (
    <div className="w-full">
      <div className="max-w-lg mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Enter Your ZIP Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="h-12 pl-10 bg-white/90 border-hack-blue/30 focus-visible:ring-hack-purple"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-hack-purple/70" />
          </div>
          
          <div className="relative w-full sm:w-36">
            <select
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="h-12 w-full px-3 py-2 rounded-md bg-white/90 border border-hack-blue/30 focus:outline-none focus:ring-2 focus:ring-hack-purple focus:border-transparent appearance-none"
            >
              <option value="10">10 miles</option>
              <option value="25">25 miles</option>
              <option value="50">50 miles</option>
              <option value="100">100 miles</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <Button
            className="h-12 bg-gradient-to-r from-hack-blue to-hack-purple text-white hover:from-hack-blue/90 hover:to-hack-purple/90"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 mr-2" />
            Find
          </Button>
        </div>
      </div>
      
      {hasSearched && (
        <div 
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            "animate-fade-in"
          )}
        >
          <HackathonCard
            name="TechCrunch Disrupt"
            location="San Francisco, CA"
            date="Oct 12-14, 2023"
            distance="3.2 miles"
            attendees={1200}
            theme="AI & Blockchain"
            delay={100}
          />
          
          <HackathonCard
            name="Health Innovate"
            location="Palo Alto, CA"
            date="Nov 5-7, 2023"
            distance="15.7 miles"
            attendees={500}
            theme="Healthcare"
            delay={200}
          />
          
          <HackathonCard
            name="EcoTech Summit"
            location="Berkeley, CA"
            date="Oct 28-30, 2023"
            distance="18.9 miles"
            attendees={350}
            theme="Sustainability"
            delay={300}
          />
        </div>
      )}
    </div>
  );
};

export default HackathonFinder;
