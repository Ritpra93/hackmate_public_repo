import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setIsSuccess(true);
      toast.success("You've been added to our waitlist!");
      setEmail("");

      // Reset success state after a delay
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto animate-fade-in" style={{ animationDelay: "800ms" }}>
      <div className="bg-hack-purple/10 p-6 rounded-2xl border-2 border-hack-purple/30 shadow-lg mb-6">
        <h3 className="text-xl font-display font-bold mb-3 text-center text-hack-dark">
          Join the waitlist today!
        </h3>
        <p className="text-hack-dark/80 mb-4 text-center">
          Be the first to find your dream hackathon team.
        </p>
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-16 h-12 font-medium bg-white/90 backdrop-blur-sm border border-white/60 
                        focus-visible:ring-hack-purple/50 focus-visible:ring-offset-0 
                        transition-all duration-300 placeholder:text-hack-dark/50"
              disabled={isSubmitting || isSuccess}
            />
            <Button
              type="submit"
              size="sm"
              className={`absolute right-1 h-10 transition-all duration-300 ${
                isSubmitting || isSuccess 
                  ? "bg-hack-purple/90 opacity-50 cursor-not-allowed" 
                  : "bg-hack-purple hover:bg-hack-purple/90"
              }`}
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isSuccess ? (
                "Thanks!"
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WaitlistForm;