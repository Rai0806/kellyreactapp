import { useState, useEffect } from "react";
import { Gift, Clock } from "lucide-react";
import osbourneDuo from "@/assets/osbourne-duo.jpg";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 1, seconds: 27 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="gradient-hero text-primary-foreground py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Rock & Roll Royalty Sharon & Kelly Osbourne Join Forces 
            With Le Creuset – Don't Miss This Cookware Giveaway!
            <span className="block text-red-400 text-3xl md:text-5xl mt-4 animate-pulse-orange">
              Up To 100% Off!
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 font-medium">
            The Osbournes bring you the hottest deal of 2025!
          </p>

          <div className="relative max-w-2xl mx-auto mb-8">
            <img 
              src={osbourneDuo} 
              alt="Sharon & Kelly Osbourne" 
              className="w-full rounded-2xl shadow-elegant animate-scale-in"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm text-card-foreground px-6 py-3 rounded-full shadow-brand">
              <span className="text-lg font-bold text-primary">LE CREUSET</span>
            </div>
          </div>

          <div className="bg-card/95 backdrop-blur-sm text-card-foreground p-6 rounded-2xl max-w-4xl mx-auto shadow-elegant">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="h-6 w-6 text-primary" />
              <p className="text-lg font-semibold">
                <strong>Sharon & Kelly Osbourne</strong> has officially partnered with{" "}
                <strong>Le Creuset</strong> for an exclusive Cookware set Giveaway to give back to fans after the tragic Passing of{" "}
                <strong>Ozzy Osbourne.</strong>
              </p>
            </div>
            
            <p className="text-base mb-6">
              Today (August 29, 2025), you've been handpicked to take part in a quick survey. It only takes a minute and you could walk away with a premium prize: the <strong>Le Creuset Cookware Set</strong>!
            </p>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <p className="text-sm">
                ⚠️ <strong>Note:</strong> These are authentic Le Creuset's product just with minor wear on the box. Supplies are extremely limited and available on a first-come, first-served basis.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 bg-primary/10 rounded-lg p-4">
              <Clock className="h-6 w-6 text-primary animate-bounce-soft" />
              <div className="text-center">
                <p className="text-sm font-medium mb-1">Time Remaining:</p>
                <div className="text-2xl font-bold text-primary">
                  {timeLeft.minutes}:{timeLeft.seconds.toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;