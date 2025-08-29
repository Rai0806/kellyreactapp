import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SurveySection from "@/components/SurveySection";
import PrizeSection from "@/components/PrizeSection";
import SocialComments from "@/components/SocialComments";

const Index = () => {
  const [currentStage, setCurrentStage] = useState<'survey' | 'prize' | 'complete'>('survey');

  const handleSurveyComplete = () => {
    setCurrentStage('prize');
  };

  const handleWin = () => {
    setCurrentStage('complete');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {currentStage === 'survey' && (
          <SurveySection onComplete={handleSurveyComplete} />
        )}
        
        {(currentStage === 'prize' || currentStage === 'complete') && (
          <PrizeSection onWin={handleWin} />
        )}
        
        {currentStage === 'complete' && (
          <SocialComments />
        )}
      </main>
    </div>
  );
};

export default Index;