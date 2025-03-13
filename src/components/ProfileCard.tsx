
import { Button } from "@/components/ui/button";
import { Github, Mail, MapPin, Star } from "lucide-react";

interface ProfileCardProps {
  name: string;
  description: string;
  skills: string[];
  location?: string;
  delay?: number;
}

const ProfileCard = ({
  name,
  description,
  skills,
  location,
  delay = 0,
}: ProfileCardProps) => {
  return (
    <div
      className="bg-white/80 rounded-3xl p-6 shadow-md border border-hack-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hack-blue to-hack-purple flex items-center justify-center text-white font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-display font-semibold text-hack-dark">{name}</h3>
          {location && (
            <div className="flex items-center text-xs text-hack-dark/60">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <p className="text-sm text-hack-dark/70 mt-2 mb-4 line-clamp-3">
          {description}
        </p>
        <div className="absolute -bottom-3 left-0 right-0 h-4 bg-gradient-to-t from-white/80 to-transparent"></div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 mb-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1 rounded-full font-medium bg-gradient-to-r from-hack-purple/10 to-hack-blue/10 text-hack-dark border border-hack-purple/20"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 pt-3 border-t border-gray-100">
        <div className="flex items-center">
          <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
          <span className="text-xs font-medium">4.9</span>
        </div>

        <Button
          size="sm"
          className="text-xs h-8 rounded-full bg-hack-purple hover:bg-hack-purple/90"
        >
          <Mail className="h-3.5 w-3.5 mr-1" />
          Connect
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
