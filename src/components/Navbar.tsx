
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavTab = {
  name: string;
  href: string;
};

const NAV_TABS: NavTab[] = [
  { name: 'Home', href: '#home' },
  { name: 'Match', href: '#match' },
  { name: 'Find', href: '#find' },
  { name: 'Create', href: '#create' },
  { name: 'News', href: '#news' },
  { name: 'Who we are', href: '#about' },
  { name: 'Rank', href: '#rank' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Update active tab based on scroll position
      const sections = NAV_TABS.map(tab => tab.href.replace('#', ''))
        .filter(id => id !== 'home')
        .map(id => document.getElementById(id))
        .filter(el => el !== null);
      
      if (window.scrollY < 300) {
        setActiveTab('Home');
        return;
      }
      
      for (const section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveTab(section.id.charAt(0).toUpperCase() + section.id.slice(1));
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabName: string, href: string) => {
    setActiveTab(tabName);
    
    // Smooth scroll to section
    const targetId = href.replace('#', '');
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#home"
          onClick={() => handleTabClick('Home', '#home')}
          className="text-2xl font-display font-bold text-hack-dark flex items-center"
        >
          <span className="animate-fade-in">Hack</span>
          <span className="text-hack-blue animate-fade-in" style={{ animationDelay: "150ms" }}>Mate</span>
          <span className="text-hack-blue animate-fade-in" style={{ animationDelay: "300ms" }}>.</span>
        </a>
        
        <div className="hidden md:flex space-x-1 items-center">
          {NAV_TABS.map((tab, index) => (
            <a 
              key={tab.name} 
              href={tab.href}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(tab.name, tab.href);
              }}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-md animate-fade-in",
                activeTab === tab.name 
                  ? "text-hack-blue" 
                  : "text-hack-dark/80 hover:text-hack-dark"
              )}
              style={{ animationDelay: `${index * 50 + 450}ms` }}
            >
              {tab.name}
            </a>
          ))}
        </div>
        
        <div className="flex space-x-3 items-center">
          <Button 
            variant="ghost" 
            className="text-sm font-medium animate-fade-in"
            style={{ animationDelay: "800ms" }}
          >
            Login
          </Button>
          <Button 
            className="bg-hack-blue hover:bg-hack-blue/90 text-white text-sm font-medium animate-fade-in"
            style={{ animationDelay: "900ms" }}
          >
            Signup
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
