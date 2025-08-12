import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Building2,
  FileText,
  Upload,
  Clock,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  Download,
} from "lucide-react";

export default function Compliance() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 1,
      title: "Business Registration",
      description: "Register your business entity with ROC",
      documents: ["PAN Card", "Aadhaar Card", "Address Proof"],
      estimatedTime: "5-7 days",
      status: "pending",
    },
    {
      id: 2,
      title: "Udyam Registration",
      description: "MSME registration for government benefits",
      documents: ["Business Registration Certificate", "Bank Details"],
      estimatedTime: "1-2 days",
      status: "pending",
    },
    {
      id: 3,
      title: "GST Registration",
      description: "Goods and Services Tax registration",
      documents: [
        "Business Registration",
        "Bank Statement",
        "Rental Agreement",
      ],
      estimatedTime: "3-5 days",
      status: "pending",
    },
    {
      id: 4,
      title: "Professional Tax",
      description: "State-level professional tax registration",
      documents: ["GST Certificate", "Employee Details"],
      estimatedTime: "2-3 days",
      status: "pending",
    },
    {
      id: 5,
      title: "ESI & PF Registration",
      description: "Employee State Insurance and Provident Fund",
      documents: ["Employee List", "Salary Structure", "Office Address Proof"],
      estimatedTime: "7-10 days",
      status: "pending",
    },
    {
      id: 6,
      title: "Shop & Establishment License",
      description: "License for commercial establishment",
      documents: ["Rental Agreement", "NOC from Owner", "Layout Plan"],
      estimatedTime: "10-15 days",
      status: "pending",
    },
  ];

  const licenses = [
    {
      name: "FSSAI License",
      required: "Food businesses",
      validity: "1-5 years",
      status: "optional",
    },
    {
      name: "Pollution Control Board",
      required: "Manufacturing units",
      validity: "5 years",
      status: "conditional",
    },
    {
      name: "Fire Safety Certificate",
      required: "Commercial buildings",
      validity: "1 year",
      status: "conditional",
    },
    {
      name: "Import Export Code",
      required: "International trade",
      validity: "Lifetime",
      status: "optional",
    },
  ];

  const toggleStepCompletion = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter((id) => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const progressPercentage = (completedSteps.length / steps.length) * 100;

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
              <Link to="/business-type">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Business Types
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
      <section className="py-16 bg-gradient-to-r from-foreground to-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              License & Compliance Journey
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Follow this step-by-step guide to ensure your business is fully
              compliant with all regulatory requirements in Delhi.
            </p>

            {/* Progress Overview */}
            <div className="bg-primary-foreground/10 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Overall Progress</span>
                <span className="text-lg">
                  {completedSteps.length} of {steps.length} completed
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-3 bg-primary-foreground/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Registration & Licensing Steps
            </h2>

            <div className="space-y-8">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                const isNext = !isCompleted && completedSteps.length === index;

                return (
                  <Card
                    key={step.id}
                    className={`relative border-2 transition-all ${
                      isCompleted
                        ? "border-accent bg-accent/10"
                        : isNext
                          ? "border-primary bg-primary/10"
                          : "border-border"
                    }`}
                  >
                    {/* Step Number */}
                    <div
                      className={`absolute -left-4 top-6 w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground font-bold ${
                        isCompleted
                          ? "bg-accent"
                          : isNext
                            ? "bg-primary"
                            : "bg-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        step.id
                      )}
                    </div>

                    <CardHeader className="ml-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-foreground mb-2">
                            {step.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {step.description}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              isCompleted
                                ? "default"
                                : isNext
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {step.estimatedTime}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="ml-8 space-y-4">
                      {/* Required Documents */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Required Documents:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {step.documents.map((doc, docIndex) => (
                            <Badge
                              key={docIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        {!isCompleted ? (
                          <>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => toggleStepCompletion(step.id)}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Documents
                            </Button>
                            <Button variant="outline" size="sm">
                              Get Help
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-accent text-accent"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Completed
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download Certificate
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Licenses */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Additional Licenses (Based on Business Type)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {licenses.map((license, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-foreground">
                        {license.name}
                      </CardTitle>
                      <Badge
                        variant={
                          license.status === "optional"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          license.status === "conditional"
                            ? "border-yellow-500 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400"
                            : ""
                        }
                      >
                        {license.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Required for:</strong> {license.required}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Validity:</strong> {license.validity}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Complete Your Journey</h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Once you've completed the compliance steps, explore government
              schemes and growth opportunities for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schemes">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-background text-primary hover:bg-muted"
                >
                  Explore Government Schemes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/summary">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
                >
                  View Progress Summary
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
