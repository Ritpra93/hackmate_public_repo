
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div
      className="bg-white/70 rounded-3xl p-6 shadow-sm border border-white/60 transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4">
        <h3 className="text-xl font-display font-semibold text-hack-dark">{name}</h3>
        <p className="text-sm text-hack-dark/70 mt-1 line-clamp-2">{description}</p>
      </div>

      {needsText && (
        <div className="flex items-center mt-2 mb-3">
          <div className="text-xs text-hack-dark/60 font-medium">{needsText}</div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4 mb-4">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              skill.bg || getBgClass(skill.name)
            }`}
          >
            {skill.name}
          </span>
        ))}
      </div>

      {(metricName || metricValue) && (
        <div className="flex items-center justify-between mt-4 mb-3">
          <div className="text-xs text-hack-dark/60 font-medium">{metricName}</div>
          <div className="text-xs font-semibold">{metricValue}</div>
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8 rounded-full bg-transparent border-gray-300"
        >
          <Github className="h-3.5 w-3.5 mr-1" />
          GitHub
        </Button>

        {hasApply && (
          <Button
            size="sm"
            className="text-xs h-8 rounded-full bg-hack-purple hover:bg-hack-purple/90"
          >
            Apply
          </Button>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
