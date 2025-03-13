
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import WaitlistForm from "@/components/WaitlistForm";
import TeamCard from "@/components/TeamCard";
import ProfileCard from "@/components/ProfileCard";
import HackathonFinder from "@/components/HackathonFinder";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate content loading
    setTimeout(() => setIsLoaded(true), 300);
    
    // Scroll animation for hero section
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - Math.min(scrollPosition / 700, 0.7);
      const transform = scrollPosition * 0.15;
      
      heroRef.current.style.opacity = String(opacity);
      heroRef.current.style.transform = `translateY(${transform}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="gradient-bg fixed inset-0 -z-10" />
      
      <Navbar />
      
      <main className="pt-24 pb-20 px-6">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto text-center pt-16 md:pt-24 pb-8" ref={heroRef} id="home">
          <div 
            className={`transition-all duration-1000 transform ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight text-hack-dark">
              Welcome To HackMate
            </h1>
            
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl md:text-2xl font-display font-medium text-hack-dark/90 mb-4">
                Need Hackathon Teammates?
                <br />
                Find local innovators, team up, 
                <br className="md:hidden" />
                and build something awesome! 
                <span className="ml-1 inline-block animate-float">🚀</span>
              </h2>
            </div>
          </div>
          
          {/* Waitlist Section - Made larger and more prominent */}
          <div className="max-w-xl mx-auto py-8 mt-4 transform scale-105 relative z-10">
            <div className="absolute -inset-3 bg-gradient-to-r from-hack-purple/20 to-hack-blue/20 rounded-3xl blur-lg -z-10 animate-pulse"></div>
            <WaitlistForm />
          </div>
          
          {/* Arrow indicator for scrolling */}
          <div 
            className={`mb-8 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mx-auto w-10 h-10 rounded-full bg-white/80 flex items-center justify-center animate-float">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-hack-blue"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
            <div className="h-12 w-0.5 mx-auto bg-gradient-to-b from-white/80 to-transparent mt-1" />
          </div>
        </section>

        {/* MOVED: Feature Cards Section */}
        <section className="max-w-5xl mx-auto py-8 my-16" id="features">
          <h2 className="text-3xl font-display font-bold mb-8 text-center text-hack-dark">
            What Makes HackMate Special
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="discover"
              description="Find hackathons that match your interests, skill level, and location preferences."
              delay={600}
              className="md:transform md:-rotate-1"
            />
            <FeatureCard
              title="match"
              description="Connect with like-minded hackers who complement your skillset."
              delay={800}
              className="md:transform md:translate-y-4"
            />
            <FeatureCard
              title="rank"
              description="Build your profile and reputation with each successful hackathon."
              delay={1000}
              className="md:transform md:rotate-1"
            />
          </div>
        </section>

        {/* Team Finder Demo Section */}
        <section 
          className="max-w-5xl mx-auto py-12 px-4 md:px-6 glass-card rounded-3xl mb-16 border-2 border-hack-blue/20 shadow-lg"
          id="match"
        >
          <h2 className="text-3xl font-display font-bold mb-2 text-center text-hack-dark">
            Match With Perfect Teams
          </h2>
          <p className="text-center text-hack-dark/80 mb-8 max-w-lg mx-auto">
            Our AI-powered matching system connects you with teams that complement your skills and share your hackathon goals
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TeamCard
              name="CodeCrusaders"
              description="We're building an AR navigation tool to help people with disabilities. Looking for someone with React experience!"
              skills={[{name: "Unity"}, {name: "AR/VR"}]}
              needsText="Need React Dev"
              metricName="Skill Match"
              metricValue="92%"
              delay={100}
            />
            
            <TeamCard
              name="EcoTech"
              description="Creating a sustainable solution for waste management using IoT sensors and data analytics."
              skills={[{name: "IoT"}, {name: "Data Science"}]}
              metricName="Interests Match"
              metricValue="86%"
              delay={200}
            />
            
            <TeamCard
              name="FinHack"
              description="Revolutionizing personal finance with blockchain solutions for microtransactions and automated savings."
              skills={[{name: "Blockchain"}, {name: "Solidity"}]}
              metricName="Location"
              metricValue="2.3 miles"
              delay={300}
            />
            
            <TeamCard
              name="HealthAI"
              description="Developing a machine learning platform to predict health issues from wearable data. Focused on preventative care."
              skills={[{name: "ML"}, {name: "Health Tech"}]}
              metricName="Availability"
              metricValue="100%"
              delay={400}
            />
          </div>
        </section>
        
        {/* Profile Demo Section */}
        <section 
          className="max-w-5xl mx-auto py-12 px-6 glass-card rounded-3xl mb-16 border-2 border-hack-purple/20 shadow-lg"
          id="find"
        >
          <h2 className="text-3xl font-display font-bold mb-2 text-center text-hack-dark">
            Discover Talented Hackers
          </h2>
          <p className="text-center text-hack-dark/80 mb-10 max-w-lg mx-auto">
            Find the perfect teammates with our advanced skill-based matching system
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProfileCard
              name="Alexis Chen"
              description="Full-stack developer focused on creating accessible applications. Experienced in React, Node, and GraphQL. Passionate about solving real-world problems."
              skills={["React", "Node.js", "GraphQL"]}
              location="San Francisco, CA"
              delay={100}
            />
            
            <ProfileCard
              name="Marcus Johnson"
              description="UX/UI designer with a background in psychology. Love creating intuitive interfaces that delight users while solving complex problems."
              skills={["Figma", "User Research", "Prototyping"]}
              location="Boston, MA"
              delay={200}
            />
            
            <ProfileCard
              name="Sophia Rodriguez"
              description="ML engineer specializing in computer vision and NLP. Looking to apply AI to social good projects. Previous hackathon winner."
              skills={["Python", "TensorFlow", "Computer Vision"]}
              location="Austin, TX"
              delay={300}
            />
          </div>
        </section>

        {/* MOVED DOWN: Hackathons Near Me Section */}
        <section 
          className="max-w-5xl mx-auto py-12 px-4 md:px-6 glass-card rounded-3xl mb-16 border-2 border-hack-purple/20 shadow-lg"
          id="discover"
        >
          <h2 className="text-3xl font-display font-bold mb-2 text-center text-hack-dark">
            Discover Hackathons Near You
          </h2>
          <p className="text-center text-hack-dark/80 mb-8 max-w-lg mx-auto">
            Find the perfect hackathon in your area based on your location and interests
          </p>
          
          <HackathonFinder />
        </section>

        {/* About Section */}
        <section 
          className="max-w-4xl mx-auto py-16 px-6 glass-card rounded-3xl mt-12 mb-20"
          id="about"
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-center text-hack-dark">
            How HackMate Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <p className="text-lg text-hack-dark/80">
                HackMate connects passionate developers, designers, and innovators for hackathons around the world.
              </p>
              <p className="text-lg text-hack-dark/80">
                Our intelligent matching system pairs you with teammates who complement your skills and share your interests.
              </p>
              <p className="text-lg text-hack-dark/80">
                Whether you're a seasoned hackathon veteran or a first-timer, HackMate helps you find the right people to bring your ideas to life.
              </p>
            </div>
            
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-hack-blue/10 to-hack-purple/10 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xl font-mono font-bold text-hack-dark/50">
                  Demo Coming Soon
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Second Waitlist Section at bottom */}
        <section className="max-w-xl mx-auto text-center py-12" id="create">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 animate-fade-in">
            Don't Miss Out!
          </h2>
          <p className="text-hack-dark/80 mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "150ms" }}>
            Be the first to know when HackMate launches. Get early access and exclusive updates on our progress.
          </p>
          
          <WaitlistForm />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-hack-dark/70">
        <div className="max-w-7xl mx-auto px-6">
          <p className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            © {new Date().getFullYear()} HackMate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
