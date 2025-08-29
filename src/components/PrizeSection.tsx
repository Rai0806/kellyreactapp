import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Loader2, Sparkles } from "lucide-react";
import cookwareSet from "@/assets/cookware-set.jpg";

const giftBoxes = [
  { id: 1, isEmpty: true },
  { id: 2, isEmpty: false },
  { id: 3, isEmpty: true },
];

interface PrizeSectionProps {
  onWin: () => void;
}

const PrizeSection = ({ onWin }: PrizeSectionProps) => {
  const [stage, setStage] = useState<'checking' | 'choosing' | 'result'>('checking');
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(3);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    // Simulate checking answers
    const timer = setTimeout(() => {
      setStage('choosing');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleBoxSelect = (boxId: number) => {
    if (attempts <= 0) return;
    
    setSelectedBox(boxId);
    const box = giftBoxes.find(b => b.id === boxId);
    
    setTimeout(() => {
      if (box?.isEmpty) {
        setAttempts(prev => prev - 1);
        setShowEmptyMessage(true);
        setTimeout(() => {
          setShowEmptyMessage(false);
          setSelectedBox(null);
        }, 2000);
      } else {
        setStage('result');
        onWin();
      }
    }, 1000);
  };

  if (stage === 'checking') {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">We are checking your answers...</h2>
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-primary" />
                <div className="space-y-2 text-left">
                  <p>✓ You answered 4 out of 4 questions</p>
                  <p>✓ There are no previous polls from your IP address.</p>
                  <p className="text-primary font-semibold">✓ There are still prizes available!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (stage === 'choosing') {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
            <p className="text-lg mb-2">We have successfully validated your answers.</p>
            <p className="text-muted-foreground mb-8">
              <strong>Friday August 29, 2025</strong>
            </p>
            
            <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
              <h3 className="text-xl font-semibold mb-4">You have the chance to win one of our prizes.</h3>
              <p className="text-lg mb-6">Try your luck!</p>
              <p className="mb-8">Simply choose the right gift box.</p>
              <p className="text-sm text-muted-foreground mb-6">
                You have {attempts} attempts, good luck!
              </p>

              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                {giftBoxes.map((box) => (
                  <button
                    key={box.id}
                    className={`aspect-square bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-xl shadow-brand hover:shadow-elegant transform transition-all duration-300 hover:scale-105 ${
                      selectedBox === box.id ? 'animate-pulse-orange scale-105' : ''
                    }`}
                    onClick={() => handleBoxSelect(box.id)}
                    disabled={attempts <= 0}
                  >
                    <div className="flex items-center justify-center h-full">
                      <Gift className="h-12 w-12" />
                    </div>
                  </button>
                ))}
              </div>

              {showEmptyMessage && (
                <div className="mt-6 bg-destructive/10 border border-destructive/20 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold mb-2">OHHH…</h4>
                  <p>Sorry, this gift box is empty! But you can try again {attempts > 1 ? `${attempts - 1} more times` : 'one more time'}. Good luck!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-scale-in">
            <Sparkles className="h-16 w-16 text-primary mx-auto mb-6 animate-bounce-soft" />
            <h2 className="text-4xl font-bold mb-6 text-primary">You did it!</h2>
            <p className="text-xl mb-8">Congratulations! You won the Le Creuset Cookware set!</p>
            
            <img 
              src={cookwareSet} 
              alt="Le Creuset Cookware Set" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-elegant mb-8"
            />

            <Card className="shadow-card text-left">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">***THE RULES***</h3>
                <ol className="space-y-3 text-sm">
                  <li>1. You will be directed to the website of our certified distributors.</li>
                  <li>2. Enter your address & pay a small shipping fee to get your Le Creuset Cookware set.</li>
                  <li>3. The Le Creuset Cookware set will be delivered within 5-7 days</li>
                </ol>
                
                <Button 
                  variant="brand"
                  className="w-full mt-6"
                  size="lg"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizeSection;