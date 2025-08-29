import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Do you have a valid US address to ship to?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 2,
    text: "Have you participated in a LeCreuset.com promotion in the last 30 days?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 3,
    text: "How old are you?",
    options: [
      { value: "18-29", label: "18-29" },
      { value: "30-39", label: "30-39" },
      { value: "40-49", label: "40-49" },
      { value: "50+", label: "50+" }
    ]
  },
  {
    id: 4,
    text: "Do you agree to pay for shipping if selected?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  }
];

interface SurveySectionProps {
  onComplete: () => void;
}

const SurveySection = ({ onComplete }: SurveySectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  const question = questions[currentQuestion];

  return (
    <section className="py-16 bg-gradient-to-br from-brand-cream to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Quick Survey</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Every Friday, 10 lucky participants across the U.S. are selected to win. And today could be your day! But don't wait, this offer is valid for a limited time only.
            </p>
            <p className="text-base mb-4">
              Your feedback helps us improve, and as a thank-you, you'll get a shot at the exclusive <strong>Osbourne Family Le Creuset Cookware set.</strong>
            </p>
            <div className="bg-destructive/20 text-destructive rounded-lg p-3 text-sm font-medium">
              ⏳ Act fast!! This Le Creuset's product is in high demand and spots are almost gone!
            </div>
          </div>

          <Card className="shadow-card animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Question {question.id} of {questions.length}
                </CardTitle>
                <div className="flex space-x-1">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index <= currentQuestion ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-6">{question.text}</h3>
              
              <div className="space-y-3">
                {question.options.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className="w-full justify-between text-left h-auto p-4 hover:shadow-card transition-all duration-200"
                    onClick={() => handleAnswer(question.id, option.value)}
                  >
                    <span>{option.label}</span>
                    {answers[question.id] === option.value && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SurveySection;