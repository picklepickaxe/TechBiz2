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
import { useAuthModal } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import BusinessWizard from "@/components/BusinessWizard";
import {
  Building2,
  CheckCircle,
  Users,
  FileText,
  Shield,
  TrendingUp,
  Clock,
  ArrowRight,
  Play,
  Star,
  Sparkles,
} from "lucide-react";

export default function Index() {
  const { openModal } = useAuthModal();
  const features = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Business Registration",
      description: "Streamlined process for all types of business entities",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "License Management",
      description: "Track and manage all your licenses in one place",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Compliance Monitoring",
      description: "Stay compliant with automated reminders and updates",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Schemes",
      description: "Discover government schemes tailored for your business",
    },
  ];

  const businessTypes = [
    "Sole Proprietorship",
    "Partnership",
    "MSME",
    "DPIIT Startup",
  ];

  const stats = [
    { value: "50+", label: "Government Schemes" },
    { value: "15+", label: "License Types" },
    { value: "24/7", label: "AI Support" },
    { value: "100%", label: "Digital Process" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                TechBiz
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/business-types"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Business Types
              </Link>
              <Link
                to="/schemes"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Schemes
              </Link>
              <Link
                to="/compliance"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Compliance
              </Link>
              <Link
                to="/analytics"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Analytics
              </Link>
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={() => openModal("login")}
                className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Log In
              </Button>
              <Button
                size="sm"
                onClick={() => openModal("signup")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/project.jpg')`, // updated to use the new project.jpg image
          }}
        >
          <div className="absolute inset-0 bg-background/80"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Easing out business activities for
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-shift">
                {" "}
                growth
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigate Delhi's business landscape with confidence. From
              registration to compliance, we simplify every step of your
              entrepreneurial journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/business-types">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Start Your Business Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/schemes">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Compare Schemes
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Quick Access */}
      <section className="py-20 bg-primary/10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Select Your Business Type
            </h2>
            <p className="text-xl mb-12 text-muted-foreground">
              Get personalized guidance based on your business structure
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {businessTypes.map((type, index) => (
                <Link key={index} to="/business-types">
                  <Card className="border-primary/30 bg-card/80 hover:bg-card/90 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:border-primary/60">
                    <CardHeader className="text-center py-8">
                      <CardTitle className="text-foreground text-base md:text-lg">
                        {type}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-12">
              <Link to="/business-types">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Challenges Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Business Challenges We Solve
            </h2>
            <p className="text-xl text-muted-foreground">
              Businesses face numerous obstacles in today's complex regulatory
              environment. TechBiz addresses these pain points with innovative
              solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/20 bg-muted/50 hover:bg-muted/70 transition-colors">
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-4" />
                <CardTitle className="text-foreground">
                  Time-Consuming Processes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Redundant and fragmented regulatory processes that delay
                  business operations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-muted/50 hover:bg-muted/70 transition-colors">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-4" />
                <CardTitle className="text-foreground">
                  Lack of Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  No real-time tracking of approvals and licenses, leading to
                  uncertainty.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-muted/50 hover:bg-muted/70 transition-colors">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-4" />
                <CardTitle className="text-foreground">
                  Dependency on Middlemen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  High dependency on consultants increases costs and reduces
                  transparency.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose TechBiz?
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform provides end-to-end solutions for all your business
              needs in Delhi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-border/20 bg-muted/50 hover:bg-muted/70 transition-colors"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Wizard */}
      <BusinessWizard />

      {/* Footer */}
      <footer className="bg-muted text-foreground py-16 border-t border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">
                  TechBiz
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Simplifying business operations in Delhi with innovative digital
                solutions for entrepreneurs and enterprises.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Contact Support
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    to="/business-types"
                    className="hover:text-primary transition-colors"
                  >
                    Business Registration
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compliance"
                    className="hover:text-primary transition-colors"
                  >
                    License Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/schemes"
                    className="hover:text-primary transition-colors"
                  >
                    Government Schemes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/analytics"
                    className="hover:text-primary transition-colors"
                  >
                    Analytics Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-primary transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    className="hover:text-primary transition-colors"
                  >
                    Business Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/20 mt-12 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025 TechBiz. All rights reserved. Empowering businesses in
              Delhi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
