import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Wand2,
  Star,
  MessageCircle,
  ArrowRight,
  X,
  Send,
  Bot,
} from "lucide-react";

export default function BusinessWizard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [showTip, setShowTip] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messagesEndRef, setMessagesEndRef] = useState(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("businessWizardMessages");
    const isFirstVisitCheck = localStorage.getItem("businessWizardFirstVisit");

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Error loading chat history:", error);
        setMessages([getWelcomeMessage()]);
      }
    } else {
      setMessages([getWelcomeMessage()]);
    }

    if (isFirstVisitCheck === null) {
      setIsFirstVisit(true);
      localStorage.setItem("businessWizardFirstVisit", "false");
      // Show welcome tooltip for 5 seconds on first visit
      setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }, 1000);
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("businessWizardMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const getWelcomeMessage = () => ({
    id: Date.now(),
    text: "Hello! I'm your Business Wizard. I can help you with business registration, licensing, and government schemes. What would you like to know?",
    isBot: true,
    timestamp: new Date(),
  });

  const wizardTips = [
    "💡 Did you know? MSME registration gives you access to 200+ government schemes!",
    "🚀 Startups with DPIIT recognition get 3 years of income tax exemption!",
    "⚡ GST registration can be completed online in just 3-5 days!",
    "🎯 Professional tax varies by state - Delhi has competitive rates!",
    "🏆 Shop & Establishment license is mandatory for all commercial setups!",
  ];

  const aiResponses = {
    // Business Registration
    "business registration":
      "To register your business, you'll need: 1) Choose business structure (Sole Proprietorship, Partnership, MSME, or Startup) 2) Prepare required documents 3) Complete online registration. The process typically takes 5-7 days. Would you like me to guide you through choosing the right structure?",
    register:
      "To register your business, you'll need: 1) Choose business structure (Sole Proprietorship, Partnership, MSME, or Startup) 2) Prepare required documents 3) Complete online registration. The process typically takes 5-7 days. Would you like me to guide you through choosing the right structure?",
    registration:
      "Business registration in Delhi involves selecting the right structure, preparing documents, and completing online applications. I can help you understand which type suits your business best. What's your business idea?",

    // MSME
    msme: "MSME registration provides access to 50+ government schemes, easier loan approvals, and tax benefits. It's free and can be completed online through the Udyam portal in 1-2 days. Benefits include priority lending, lower interest rates, and government tender advantages.",
    udyam:
      "Udyam registration is the new MSME registration process. It's completely online, free, and requires only Aadhaar and PAN. You get instant certificate and access to numerous government benefits.",

    // GST
    gst: "GST registration is mandatory for businesses with turnover above ₹40 lakhs (₹20 lakhs for services). You'll need PAN, business registration certificate, and bank details. Processing takes 3-5 days. I can help you understand GST rates for your business type.",
    tax: "GST registration is mandatory for businesses with turnover above ₹40 lakhs (₹20 lakhs for services). You'll need PAN, business registration certificate, and bank details. Processing takes 3-5 days. I can help you understand GST rates for your business type.",

    // Startup
    startup:
      "DPIIT Startup recognition offers 3 years income tax exemption, fast-track patent examination, and access to government schemes. Your startup should be less than 10 years old and have innovative business model. The application process is online and free.",
    dpiit:
      "DPIIT recognition provides startups with tax exemptions, patent benefits, and easier compliance. The process involves online application with business plan, incorporation certificate, and innovation details.",

    // Schemes
    schemes:
      "Popular schemes include: PM MUDRA (loans up to ₹10 lakh), Stand-Up India (₹10 lakh - ₹1 crore), PM SVANidhi (street vendors), and Startup India Seed Fund. Each has specific eligibility criteria. Which business sector are you in?",
    loan: "Government loan schemes include MUDRA (up to ₹10L), Stand-Up India (₹10L-₹1Cr), and various state schemes. Interest rates are subsidized and collateral requirements are minimal. What's your loan requirement?",
    funding:
      "Funding options include government schemes like MUDRA, angel investors, and startup grants. For early-stage businesses, government schemes offer the best terms. What stage is your business at?",

    // Licenses
    license:
      "Common licenses include: Shop & Establishment (mandatory), Professional Tax, FSSAI (food businesses), Pollution Clearance (manufacturing), and Import-Export Code (international trade). Requirements vary by business type.",
    fssai:
      "FSSAI license is mandatory for food businesses. Basic registration for small businesses (turnover <₹12L), State license for medium (₹12L-₹20Cr), and Central license for large businesses. Processing takes 7-15 days.",
    "shop establishment":
      "Shop & Establishment license is mandatory for all commercial establishments. It's required for hiring employees, opening bank accounts, and other business activities. Application is online through state portal.",

    // Compliance
    compliance:
      "Business compliance includes regular filing of returns, license renewals, and maintaining statutory records. Key areas: GST returns, income tax, labor compliance, and environmental clearances.",
    documents:
      "Essential business documents include: Incorporation certificate, PAN card, GST certificate, bank account details, registered office proof, and director/partner details. Keep digital and physical copies.",

    // General Queries
    help: "I can help you with business registration, licensing, government schemes, compliance requirements, and funding options. What specific area would you like to explore?",
    cost: "Business setup costs vary: Sole Proprietorship (₹2K-₹5K), Partnership (₹5K-₹10K), MSME registration (Free), GST registration (Free). Professional services may cost extra. What business structure interests you?",
    time: "Timeline varies: Business registration (3-7 days), GST (3-5 days), MSME (1-2 days), FSSAI (7-15 days). Parallel processing can reduce overall time. Planning to start soon?",
    delhi:
      "Delhi offers excellent business infrastructure with single-window clearances, online services, and startup-friendly policies. The Delhi Startup Policy provides additional benefits for new businesses.",

    // Analytics and Data
    analytics:
      "Our Analytics Dashboard provides comprehensive business insights with interactive charts, AI-powered analysis, and predictive modeling. You can track registration trends, scheme performance, and revenue analytics. Visit the Analytics section to explore!",
    dashboard:
      "The Analytics Dashboard offers multiple chart types (bar, line, area, pie) with AI analysis. You can upload your own datasets or explore example data to understand business trends and get predictions.",
    data: "You can analyze business data including registration trends, scheme performance, compliance tracking, and revenue analytics. Our AI provides insights, predictions, and recommendations based on data patterns.",
    charts:
      "We support various chart types: Bar charts for comparisons, Line charts for trends, Area charts for cumulative data, and Pie charts for distributions. All charts are interactive with detailed tooltips.",
    predictions:
      "Our AI analyzes historical data to predict future trends like registration growth, scheme demand, and market opportunities. The predictions help in strategic planning and resource allocation.",

    // Default responses
    greeting:
      "Hello! I'm your Business Wizard, here to guide you through business registration, licensing, compliance, and analytics in Delhi. I can help with MSME registration, GST, government schemes, data analysis, and much more. What would you like to know?",
    thanks:
      "You're welcome! Feel free to ask any other questions about business registration, licensing, government schemes, or analytics. I'm here to help make your business journey smooth!",
    default:
      "I can help you with business registration, MSME benefits, GST registration, startup schemes, government licensing, compliance requirements, and business analytics. Could you be more specific about what you'd like to know?",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % wizardTips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef) {
      messagesEndRef.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();

    // Handle greetings
    if (
      /^(hi|hello|hey|good morning|good afternoon|good evening)/.test(message)
    ) {
      return aiResponses.greeting;
    }

    // Handle thanks
    if (/thank|thanks/.test(message)) {
      return aiResponses.thanks;
    }

    // Handle help requests
    if (/help|assist|guide/.test(message)) {
      return aiResponses.help;
    }

    // More intelligent keyword matching with priority
    const keywords = Object.keys(aiResponses).filter(
      (key) => !["greeting", "thanks", "default"].includes(key),
    );

    // Check for exact matches first
    for (const keyword of keywords) {
      if (message.includes(keyword)) {
        return aiResponses[keyword];
      }
    }

    // Check for related terms
    if (/register|start.*business|new.*business|open.*business/.test(message)) {
      return aiResponses["business registration"];
    }

    if (/money|fund|capital|invest/.test(message)) {
      return aiResponses.funding;
    }

    if (/permit|permission|legal/.test(message)) {
      return aiResponses.license;
    }

    if (/small.*business|micro.*enterprise/.test(message)) {
      return aiResponses.msme;
    }

    if (/how.*much|price|fee|charge/.test(message)) {
      return aiResponses.cost;
    }

    if (/how.*long|duration|timeline/.test(message)) {
      return aiResponses.time;
    }

    return aiResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const currentInput = inputMessage;
    const userMessage = {
      id: Date.now(),
      text: currentInput,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate realistic AI thinking time (1-3 seconds based on message length)
    const thinkingTime = Math.min(
      3000,
      Math.max(1000, currentInput.length * 50),
    );

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(currentInput),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const clearChatHistory = () => {
    const welcomeMessage = getWelcomeMessage();
    setMessages([welcomeMessage]);
    localStorage.setItem(
      "businessWizardMessages",
      JSON.stringify([welcomeMessage]),
    );
  };

  return (
    <>
      {/* Modern Circular AI Bot Button */}
      {!isExpanded && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            {/* AI Bot Button */}
            <Button
              onClick={() => {
                setIsExpanded(true);
                setShowTip(false);
                setShowTooltip(false);
              }}
              onMouseEnter={() => !isFirstVisit && setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="w-16 h-16 rounded-full shadow-lg bg-gradient-to-br from-primary to-accent text-primary-foreground border-2 border-primary/20 hover:shadow-xl hover:scale-110 transition-all duration-300 hover:from-primary/90 hover:to-accent/90 relative overflow-hidden group"
            >
              {/* AI Icon with animated background */}
              <div className="relative z-10">
                <div className="w-8 h-8 relative">
                  {/* Neural network lines */}
                  <div className="absolute inset-0">
                    <svg
                      viewBox="0 0 32 32"
                      className="w-full h-full"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      {/* Neural network nodes */}
                      <circle cx="8" cy="8" r="2" fill="currentColor" />
                      <circle cx="24" cy="8" r="2" fill="currentColor" />
                      <circle cx="16" cy="16" r="3" fill="currentColor" />
                      <circle cx="8" cy="24" r="2" fill="currentColor" />
                      <circle cx="24" cy="24" r="2" fill="currentColor" />

                      {/* Neural network connections */}
                      <line
                        x1="8"
                        y1="8"
                        x2="16"
                        y2="16"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />
                      <line
                        x1="24"
                        y1="8"
                        x2="16"
                        y2="16"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />
                      <line
                        x1="16"
                        y1="16"
                        x2="8"
                        y2="24"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />
                      <line
                        x1="16"
                        y1="16"
                        x2="24"
                        y2="24"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Animated pulse effect */}
              <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
            </Button>

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute bottom-full right-0 mb-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                <div className="bg-background dark:bg-[#696669] text-foreground dark:text-white px-4 py-2 rounded-lg shadow-lg border border-border dark:border-[#696669] whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span className="font-medium">Your Business Wizard</span>
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-gray-300 mt-1">
                    Ask me anything about business!
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background dark:border-t-[#696669]"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Expanded Wizard Panel */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed bottom-4 right-4 w-full max-w-md max-h-[calc(100vh-2rem)] h-[500px] shadow-2xl rounded-lg overflow-hidden bg-background dark:bg-[#696669]">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 bg-background dark:bg-[#696669]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-muted dark:bg-white/20 rounded-full">
                      <Wand2 className="h-6 w-6 text-foreground dark:text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground dark:text-white">
                        Your Business Wizard
                      </h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">
                        AI-powered guidance for your journey
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearChatHistory}
                      className="p-2 hover:bg-muted dark:hover:bg-white/20 text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white"
                      title="Clear chat history"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 hover:bg-muted dark:hover:bg-white/20 text-foreground dark:text-white"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Message history indicator */}
                {messages.length > 1 && (
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted dark:bg-white/20 text-xs text-muted-foreground dark:text-gray-300">
                      <MessageCircle className="h-3 w-3" />
                      <span>{messages.length} messages • History saved</span>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                          message.isBot
                            ? "bg-muted dark:bg-white/20 text-foreground dark:text-white"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {message.isBot && (
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-3 w-3" />
                            <span className="text-xs opacity-70">
                              AI Assistant
                            </span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">
                          {message.text}
                        </p>
                        <div className="text-xs opacity-50 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start animate-in fade-in-0">
                      <div className="bg-muted dark:bg-white/20 px-4 py-2 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                          <Bot className="h-3 w-3" />
                          <span className="text-xs opacity-70">
                            AI is typing
                          </span>
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Invisible element for auto-scroll */}
                  <div ref={setMessagesEndRef} />
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border dark:border-gray-600">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your question here... e.g., 'How do I start a business in Delhi?'"
                      className="flex-1 border-border dark:border-gray-600 text-sm"
                      onKeyPress={(e) =>
                        e.key === "Enter" && !e.shiftKey && handleSendMessage()
                      }
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground dark:text-gray-400 px-1">
                    💡 Try asking: \"What documents do I need for GST?\" or
                    \"How much does business registration cost?\"
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setInputMessage("How do I register my business?")
                    }
                    className="text-xs"
                  >
                    🏢 Business Registration
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage("What are MSME benefits?")}
                    className="text-xs"
                  >
                    🏭 MSME Benefits
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setInputMessage("Show me government schemes")
                    }
                    className="text-xs"
                  >
                    💰 Schemes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage("What licenses do I need?")}
                    className="text-xs"
                  >
                    📋 Licenses
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setInputMessage("Tell me about the analytics dashboard")
                    }
                    className="text-xs"
                  >
                    📊 Analytics
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
