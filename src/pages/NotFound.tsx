
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg px-6">
      <div className="glass-card p-12 rounded-3xl text-center max-w-md animate-fade-in">
        <h1 className="text-6xl font-mono font-bold mb-6 text-hack-blue">404</h1>
        <p className="text-xl text-hack-dark/80 mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Button 
          asChild
          className="bg-hack-blue hover:bg-hack-blue/90 text-white"
        >
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
