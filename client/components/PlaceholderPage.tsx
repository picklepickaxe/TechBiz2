import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Building2,
  ArrowLeft,
  Construction,
  MessageSquare,
} from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  features?: string[];
}

export default function PlaceholderPage({
  title,
  description,
  features = [],
}: PlaceholderPageProps) {
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
                  <ArrowLeft className="h-4 w-4 mr-2" />
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

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-2 border-dashed border-border">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Construction className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-3xl text-foreground mb-4">
                {title}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {features.length > 0 && (
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-3">
                    Planned Features:
                  </h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-muted-foreground"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    Want this page developed?
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Let us know you'd like this feature implemented and we'll
                  prioritize its development.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-primary hover:bg-primary/90">
                    Request Feature
                  </Button>
                  <Link to="/">
                    <Button variant="outline">Return to Homepage</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
