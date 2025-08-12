import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  Factory,
  Lightbulb,
  ArrowRight,
  Check,
  ChevronLeft,
} from "lucide-react";

export default function BusinessTypes() {
  const businessTypes = [
    {
      id: "sole-proprietorship",
      icon: <Users className="h-8 w-8" />,
      title: "Sole Proprietorship",
      description:
        "Perfect for individual entrepreneurs starting their first business",
      features: [
        "Single owner structure",
        "Minimal compliance requirements",
        "Direct control over business",
        "Simple tax filing",
      ],
      timeToSetup: "3-5 days",
      cost: "₹2,000 - ₹5,000",
      recommended: false,
    },
    {
      id: "partnership",
      icon: <Users className="h-8 w-8" />,
      title: "Partnership",
      description:
        "Ideal for businesses with multiple partners sharing responsibilities",
      features: [
        "Shared ownership and responsibilities",
        "Partnership deed required",
        "Shared profits and losses",
        "Multiple skill sets",
      ],
      timeToSetup: "7-10 days",
      cost: "₹5,000 - ₹10,000",
      recommended: false,
    },
    {
      id: "msme",
      icon: <Factory className="h-8 w-8" />,
      title: "MSME",
      description: "Micro, Small & Medium Enterprises with government benefits",
      features: [
        "Government scheme benefits",
        "Easy loan access",
        "Tax exemptions",
        "Udyam registration",
      ],
      timeToSetup: "5-7 days",
      cost: "₹3,000 - ₹8,000",
      recommended: true,
    },
    {
      id: "startup",
      icon: <Lightbulb className="h-8 w-8" />,
      title: "DPIIT Startup",
      description: "Innovation-driven entities with DPIIT recognition benefits",
      features: [
        "Income tax exemption for 3 years",
        "Fast-track patent examination",
        "Self-certification compliance",
        "Government tenders priority",
      ],
      timeToSetup: "15-30 days",
      cost: "���10,000 - ₹25,000",
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                TechBiz
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Log In
              </Button>
              <Button size="sm">Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Business Structure
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Select the business type that best fits your goals and
              requirements. Each structure has different benefits, compliance
              requirements, and growth potential.
            </p>
          </div>
        </div>
      </section>

      {/* Business Types Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {businessTypes.map((type) => (
              <Card
                key={type.id}
                className={`relative border-2 hover:shadow-xl transition-all hover:-translate-y-1 ${
                  type.recommended
                    ? "border-accent shadow-lg ring-2 ring-accent/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {type.recommended && (
                  <Badge className="absolute -top-3 left-6 bg-accent text-accent-foreground">
                    Recommended
                  </Badge>
                )}

                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      type.recommended
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {type.icon}
                  </div>
                  <CardTitle className="text-2xl text-foreground">
                    {type.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {type.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-muted-foreground"
                        >
                          <Check className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline and Cost */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Setup Time</p>
                      <p className="font-semibold text-foreground">
                        {type.timeToSetup}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estimated Cost
                      </p>
                      <p className="font-semibold text-foreground">
                        {type.cost}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={`/compliance?type=${type.id}`} className="block">
                    <Button
                      className={`w-full ${
                        type.recommended
                          ? "bg-accent hover:bg-accent/90"
                          : "bg-primary hover:bg-primary/90"
                      } text-primary-foreground`}
                      size="lg"
                    >
                      Start {type.title} Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Need Help Deciding?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our experts can help you choose the right business structure based
              on your specific needs, investment capacity, and growth plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schemes">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Compare Government Schemes
                </Button>
              </Link>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Consult an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
