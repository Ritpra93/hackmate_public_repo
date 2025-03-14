
import { Github, Rocket, Shield, Users, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Skill {
  name: string;
  bg?: string;
}

interface TeamCardProps {
  name: string;
  description: string;
  skills: Skill[];
  needsText?: string;
  metricName?: string;
  metricValue?: string;
  hasApply?: boolean;
  delay?: number;
}

const TeamCard = ({
  name,
  description,
  skills,
  needsText,
  metricName,
  metricValue,
  hasApply = true,
  delay = 0,
}: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBgClass = (name: string) => {
    switch (name.toLowerCase()) {
      case "react js":
      case "react":
        return "bg-blue-100 text-blue-800";
      case "python":
        return "bg-green-100 text-green-800";
      case "figma":
        return "bg-purple-100 text-purple-800";
      case "html css":
        return "bg-orange-100 text-orange-800";
      case "java script":
        return "bg-yellow-100 text-yellow-800";
      case "ui ux design":
        return "bg-pink-100 text-pink-800";
      case "optimization":
        return "bg-indigo-100 text-indigo-800";
      case "pandas":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const generateTeamStyle = () => {
    const nameLength = name.length;
    const firstChar = name.charCodeAt(0);
    const lastChar = name.charCodeAt(name.length - 1);
    
    const gradients = [
      "bg-gradient-to-r from-amber-100 to-rose-100",
      "bg-gradient-to-r from-emerald-50 to-teal-100",
      "bg-gradient-to-r from-cyan-50 to-blue-100",
      "bg-gradient-to-r from-violet-50 to-purple-100",
      "bg-gradient-to-r from-rose-50 to-pink-100",
    ];
    
    const borders = [
      "border-l-4 border-amber-400",
      "border-l-4 border-emerald-400",
      "border-l-4 border-cyan-400",
      "border-l-4 border-violet-400",
      "border-l-4 border-rose-400",
    ];
    
    const gradientIndex = firstChar % gradients.length;
    const borderIndex = lastChar % borders.length;
    
    return `${gradients[gradientIndex]} ${borders[borderIndex]}`;
  };

  const TeamIcon = () => {
    const iconMap = {
      0: <Shield className="h-5 w-5 text-indigo-500" />,
      1: <Rocket className="h-5 w-5 text-pink-500" />,
      2: <Users className="h-5 w-5 text-amber-500" />,
    };
    
    const index = (name.length * name.charCodeAt(0)) % 3;
    return iconMap[index as keyof typeof iconMap];
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 
      hover:shadow-xl backdrop-blur-sm
      ${generateTeamStyle()} bg-white/70`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 rotate-45 transform translate-x-10 -translate-y-10 
        bg-gradient-to-br from-indigo-300 to-violet-200 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20 rotate-45 transform -translate-x-10 translate-y-10 
        bg-gradient-to-tr from-amber-300 to-rose-200 rounded-full"></div>
      
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Team Info */}
        <div className="p-6 md:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-white/80 shadow-sm">
              {TeamIcon()}
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-hack-dark tracking-tight">{name}</h3>
              {metricName && metricValue && (
                <Badge variant="outline" className="mt-1 bg-white/70 border-none shadow-sm">
                  {metricName}: <span className="font-bold ml-1">{metricValue}</span>
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-sm text-hack-dark/80 mb-5 line-clamp-3">{description}</p>
        </div>
        
        {/* Right Side - Skills and Actions */}
        <div className="md:w-1/3 bg-white/40 p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold mb-2 text-hack-dark/70">Team Skills</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    skill.bg || getBgClass(skill.name)
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
            
            {needsText && (
              <div className="mt-3">
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 rounded-full px-3 py-1 border border-rose-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  {needsText}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between text-xs h-8 rounded-lg bg-white/90 border-gray-200 shadow-sm hover:bg-white"
            >
              <span className="flex items-center">
                <Github className="h-3.5 w-3.5 mr-1.5" />
                GitHub
              </span>
              <ExternalLink className="h-3 w-3" />
            </Button>

            {hasApply && (
              <Button
                size="sm"
                className="w-full justify-between text-xs h-8 rounded-lg bg-gradient-to-r from-hack-blue to-hack-purple hover:from-hack-blue/90 hover:to-hack-purple/90 text-white shadow-sm font-medium"
              >
                <span>Join Team</span>
                <CheckCircle2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
