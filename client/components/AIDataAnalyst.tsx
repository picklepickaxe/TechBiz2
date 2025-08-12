import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Brain,
  Send,
  Loader2,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface AIDataAnalystProps {
  dataset: any[];
  datasetName: string;
  datasetDescription: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  insights?: string[];
  timestamp: Date;
}

export default function AIDataAnalyst({
  dataset,
  datasetName,
  datasetDescription,
}: AIDataAnalystProps) {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "ai",
      content: `Hello! I'm your AI Data Analyst. I can help you analyze your ${datasetName} dataset and answer questions about your business data. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          dataset: dataset,
          datasetName: datasetName,
          datasetDescription: datasetDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI analysis");
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: data.answer,
        insights: data.insights,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `I apologize, but I encountered an error while analyzing your data: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }. Please try again or rephrase your question.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What are the key trends in this data?",
    "Which category shows the highest growth?",
    "What insights can you provide about performance?",
    "Are there any concerning patterns I should know about?",
    "What recommendations do you have based on this data?",
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              AI Data Analyst
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                GPT-4 Powered
              </Badge>
            </CardTitle>
            <CardDescription>
              Ask questions about your {datasetName} data and get AI-powered insights
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {message.type === "ai" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4" />
                    <span className="text-xs font-medium opacity-70">
                      AI Analyst
                    </span>
                  </div>
                )}
                
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>

                {message.insights && message.insights.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-1 text-xs font-medium opacity-70">
                      <Lightbulb className="h-3 w-3" />
                      Key Insights:
                    </div>
                    {message.insights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-xs bg-background/50 rounded p-2"
                      >
                        <TrendingUp className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-xs opacity-50 mt-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span className="text-xs font-medium opacity-70">
                    AI is analyzing your data...
                  </span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-t bg-muted/30">
            <Label className="text-sm font-medium mb-3 block">
              Try asking:
            </Label>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 px-3"
                  onClick={() => setQuestion(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about your data..."
                disabled={isLoading}
                className="border-primary/30 focus:border-primary"
              />
            </div>
            <Button
              type="submit"
              disabled={!question.trim() || isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
          
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <AlertCircle className="h-3 w-3" />
            <span>
              AI responses are generated based on your uploaded data. Results may vary.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}