import { useState, useEffect } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'survey' | 'checking' | 'boxes' | 'win'>('survey');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState({ minutes: 1, seconds: 27 });
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(3);
  const [showEmpty, setShowEmpty] = useState(false);

  const questions = [
    {
      text: "Do you have a valid US address to ship to?",
      options: ["Yes", "No"]
    },
    {
      text: "Have you participated in a LeCreuset.com promotion in the last 30 days?",
      options: ["Yes", "No"]
    },
    {
      text: "How old are you?",
      options: ["18-29", "30-39", "40-49", "50+"]
    },
    {
      text: "Do you agree to pay for shipping if selected?",
      options: ["Yes", "No"]
    }
  ];

  // Timer countdown
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

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer });
    
    if (questionIndex < questions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setCurrentStep('checking');
      setTimeout(() => {
        setCurrentStep('boxes');
      }, 3000);
    }
  };

  const handleBoxClick = (boxId: number) => {
    setSelectedBox(boxId);
    
    setTimeout(() => {
      if (boxId === 2) { // Middle box wins
        setCurrentStep('win');
      } else {
        setShowEmpty(true);
        setAttempts(attempts - 1);
        setTimeout(() => {
          setShowEmpty(false);
          setSelectedBox(null);
        }, 2000);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Simple header with just Le Creuset logo */}
      <div className="w-full bg-white py-6 px-6 border-b border-gray-200">
        <img 
          src="/lovable-uploads/e9c21c93-e0bd-409b-858d-811592a0754a.png" 
          alt="Le Creuset" 
          className="h-20 w-auto"
        />
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main headline */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Rock & Roll Royalty Sharon & Kelly Osbourne Join Forces With Le Creuset – Don't Miss This Cookware Giveaway!
            <br />
            <span className="text-red-600 text-2xl md:text-3xl">Up To 100% Off!</span>
          </h1>
          
          <p className="text-lg mb-6">The Osbournes bring you the hottest deal of 2025!</p>
          
          <img src="/main.png" alt="Sharon & Kelly Osbourne" className="w-full max-w-2xl mx-auto mb-6" />
          
          <div className="text-left max-w-3xl mx-auto space-y-4">
            <p>
              🎉 <strong>Sharon & Kelly Osbourne</strong> has officially partnered with <strong>Le Creuset</strong> for an exclusive Cookware set Giveaway to give back to fans after the tragic Passing of <strong>Ozzy Osbourne.</strong>
            </p>
            
            <p>
              Today (August 29, 2025), you've been handpicked to take part in a quick survey. It only takes a minute and you could walk away with a premium prize: the <strong>Le Creuset Cookware Set</strong>!
            </p>
            
            <div className="bg-yellow-100 border border-yellow-400 p-3 rounded">
              <p className="text-sm">
                ⚠️ <strong>Note:</strong> These are authentic Le Creuset's product just with minor wear on the box. Supplies are extremely limited and available on a first-come, first-served basis.
              </p>
            </div>
          </div>
        </div>

        {/* Product showcase - Le Creuset Dutch oven */}
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/8a5793e3-162e-4f06-9f0c-db0bddcb678b.png" 
            alt="Le Creuset Dutch Oven" 
            className="max-w-full h-auto max-h-64 object-contain"
          />
        </div>

        {/* Survey section */}
        {currentStep === 'survey' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <p className="mb-4">
                Every Friday, 10 lucky participants across the U.S. are selected to win. And today could be your day! But don't wait, this offer is valid for a limited time only.
              </p>
              <p className="mb-4">
                Your feedback helps us improve, and as a thank-you, you'll get a shot at the exclusive <strong>Osbourne Family Le Creuset Cookware set.</strong>
              </p>
              <p className="mb-4">
                You only have <strong>{timeLeft.minutes} minutes and {timeLeft.seconds} seconds</strong> left to complete the survey and claim your entry!
              </p>
              <p className="text-red-600 font-bold mb-6">
                ⏳ Act fast!! This Le Creuset's product is in high demand and spots are almost gone!
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded border">
              <h3 className="text-lg font-bold mb-4">
                <strong>Question {currentQuestion + 1} of 4:</strong> {questions[currentQuestion].text}
              </h3>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion, option)}
                    className="w-full text-left p-3 bg-white border border-gray-300 hover:bg-gray-100 rounded"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Checking answers */}
        {currentStep === 'checking' && (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">We are checking your answers...</h2>
            <div className="text-4xl mb-4">⏳</div>
            <div className="text-left bg-gray-50 p-4 rounded">
              <p>✓ You answered 4 out of 4 questions</p>
              <p>✓ There are no previous polls from your IP address.</p>
              <p>✓ There are still prizes available!</p>
            </div>
          </div>
        )}

        {/* Gift box selection */}
        {currentStep === 'boxes' && (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Congratulations, we have successfully validated your answers.</h2>
            <p className="text-lg mb-2"><strong>Friday August 29, 2025</strong></p>
            <p className="mb-4">You have the chance to win one of our prizes.</p>
            <p className="text-xl font-bold mb-4">Try your luck!</p>
            <p className="mb-4">Simply choose the right gift box.</p>
            <p className="mb-6">You have {attempts} attempts, good luck!</p>
            
            <div className="flex justify-center space-x-8 mb-6">
              {[1, 2, 3].map(boxId => (
                <button
                  key={boxId}
                  onClick={() => handleBoxClick(boxId)}
                  className={`w-20 h-20 bg-gradient-to-b from-yellow-400 to-yellow-600 border-2 border-yellow-700 rounded-lg text-white font-bold text-2xl hover:from-yellow-300 hover:to-yellow-500 ${
                    selectedBox === boxId ? 'animate-pulse' : ''
                  }`}
                  disabled={selectedBox !== null}
                >
                  🎁
                </button>
              ))}
            </div>

            {showEmpty && (
              <div className="bg-red-100 border border-red-400 p-4 rounded mb-4">
                <h3 className="font-bold">OHHH…</h3>
                <p>Sorry, this gift box is empty! But you can try again {attempts > 1 ? `${attempts - 1} more times` : 'one more time'}. Good luck!</p>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">OK</button>
              </div>
            )}
          </div>
        )}

        {/* Win state */}
        {currentStep === 'win' && (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-green-600 mb-4">You did it!</h2>
            <p className="text-xl mb-6">Congratulations! You won the Le Creuset Cookware set!</p>
            
            <img 
              src="/lovable-uploads/e0ea1277-9c3e-4bd1-a845-46e36f5e11ca.png" 
              alt="Le Creuset Cookware Set" 
              className="w-full max-w-md mx-auto mb-6 rounded-lg"
            />
            
            <div className="text-left bg-gray-50 p-6 rounded mb-6">
              <h3 className="font-bold text-lg mb-4">***THE RULES***</h3>
              <ol className="space-y-2">
                <li>1. You will be directed to the website of our certified distributors.</li>
                <li>2. Enter your address & pay a small shipping fee to get your Le Creuset Cookware set.</li>
                <li>3. The Le Creuset Cookware set will be delivered within 5-7 days</li>
              </ol>
            </div>
            
            <button className="bg-green-600 text-white px-8 py-3 rounded text-lg font-bold hover:bg-green-700">
              Apply now
            </button>
            
            {/* Social comments - Always show */}
            <div className="mt-12 text-left space-y-4">
              <h3 className="text-xl font-bold text-center mb-6">Recent Comments</h3>
              
              {[
                { name: "Sallie Hull", comment: "Shit I didn't win anything!", likes: 29, time: "4 minutes ago" },
                { name: "Natalie Jennings", comment: "I like these promotions!", likes: 9, time: "11 minutes ago" },
                { name: "Casey Daniels", comment: "Love how light it feels but still delivers powerful performance in the kitchen! 🙄", likes: 22, time: "15 minutes ago" },
                { name: "Emma Caldwell", comment: "I thought it was a joke, but my Le Creuset Cookware set arrived this morning!", likes: 36, time: "38 minutes ago" },
                { name: "Florence Cleek", comment: "Delivers flawless results every time, pure kitchen magic!", likes: 31, time: "42 minutes ago" },
                { name: "Amalia Falchi", comment: "Shhhh don't tell them that I'm using two different cards to get a Le Creuset's products for me and another to sell on FB marketplace lol. I think I've cracked the system", likes: 6, time: "1 hour ago" },
                { name: "Margaret McNutt", comment: "It's my secret weapon for making every meal feel special!", likes: 15, time: "2 hours ago" },
                { name: "Hannah Mason", comment: "Are there any other surveys to take?", likes: 39, time: "2 hours ago" },
                { name: "Zoey Chandler", comment: "Fantastic! I have never won anything before!", likes: 23, time: "3 hours ago" },
                { name: "Tina Williams", comment: "I noticed a difference in my cooking from the very first use!", likes: 30, time: "4 hours ago" }
              ].map((comment, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {comment.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-bold text-sm">{comment.name}</span>
                  </div>
                  <p className="text-sm mb-2 ml-12">{comment.comment}</p>
                  <div className="text-xs text-gray-500 ml-12">
                    I like it · Comment ❤️ {comment.likes} · {comment.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments section - Show on all pages */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="text-left space-y-4">
            <h3 className="text-xl font-bold text-center mb-6">What People Are Saying</h3>
            
            {[
              { name: "Sallie Hull", comment: "Shit I didn't win anything!", likes: 29, time: "4 minutes ago" },
              { name: "Natalie Jennings", comment: "I like these promotions!", likes: 9, time: "11 minutes ago" },
              { name: "Casey Daniels", comment: "Love how light it feels but still delivers powerful performance in the kitchen! 🙄", likes: 22, time: "15 minutes ago" },
              { name: "Emma Caldwell", comment: "I thought it was a joke, but my Le Creuset Cookware set arrived this morning!", likes: 36, time: "38 minutes ago" },
              { name: "Florence Cleek", comment: "Delivers flawless results every time, pure kitchen magic!", likes: 31, time: "42 minutes ago" },
              { name: "Amalia Falchi", comment: "Shhhh don't tell them that I'm using two different cards to get a Le Creuset's products for me and another to sell on FB marketplace lol. I think I've cracked the system", likes: 6, time: "1 hour ago" },
              { name: "Margaret McNutt", comment: "It's my secret weapon for making every meal feel special!", likes: 15, time: "2 hours ago" },
              { name: "Hannah Mason", comment: "Are there any other surveys to take?", likes: 39, time: "2 hours ago" },
              { name: "Zoey Chandler", comment: "Fantastic! I have never won anything before!", likes: 23, time: "3 hours ago" },
              { name: "Tina Williams", comment: "I noticed a difference in my cooking from the very first use!", likes: 30, time: "4 hours ago" }
            ].map((comment, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {comment.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-bold text-sm">{comment.name}</span>
                </div>
                <p className="text-sm mb-2 ml-13">{comment.comment}</p>
                <div className="text-xs text-gray-500 ml-13">
                  I like it · Comment ❤️{comment.likes} · {comment.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;