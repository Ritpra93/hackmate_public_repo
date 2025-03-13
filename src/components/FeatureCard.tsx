
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "glass-card card-hover rounded-3xl p-8 flex flex-col items-center justify-center min-h-[200px] overflow-hidden relative animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "absolute inset-0 opacity-0 bg-gradient-to-br transition-opacity duration-500",
          title.toLowerCase() === "discover" && "from-cyan-400/20 to-blue-500/20",
          title.toLowerCase() === "match" && "from-blue-400/20 to-indigo-500/20",
          title.toLowerCase() === "rank" && "from-indigo-400/20 to-purple-500/20",
          isHovered && "opacity-100"
        )}
      />
      
      <div className="z-10 text-center">
        {icon && <div className="mb-4">{icon}</div>}
        <h3 
          className={cn(
            "text-4xl mb-3 font-mono font-bold tracking-tight transition-all duration-300",
            title.toLowerCase() === "discover" && "text-cyan-500",
            title.toLowerCase() === "match" && "text-hack-blue",
            title.toLowerCase() === "rank" && "text-hack-purple",
            isHovered && "scale-110"
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="text-hack-dark/70 max-w-[280px] mx-auto">{description}</p>
        )}
      </div>
      
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 transition-all duration-300",
          title.toLowerCase() === "discover" && "bg-cyan-500",
          title.toLowerCase() === "match" && "bg-hack-blue",
          title.toLowerCase() === "rank" && "bg-hack-purple",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default FeatureCard;
