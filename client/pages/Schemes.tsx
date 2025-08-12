import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Building2,
  Search,
  Filter,
  ArrowRight,
  ChevronLeft,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react";

export default function Schemes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBusinessType, setSelectedBusinessType] = useState("all");

  const schemes = [
    {
      id: 1,
      name: "PM SVANidhi Scheme",
      category: "Street Vendors",
      businessTypes: ["Sole Proprietorship"],
      description: "Affordable working capital loan for street vendors",
      benefits: [
        "Collateral-free loans up to ₹10,000",
        "7% interest subsidy on regular repayment",
        "Digital payment incentives",
      ],
      eligibility: "Street vendors with vending certificate",
      loanAmount: "₹10,000 - ₹50,000",
      subsidyRate: "7%",
      processingTime: "15-30 days",
      rating: 4.5,
      applicationsCount: "2.5M+",
      featured: true,
    },
    {
      id: 2,
      name: "Pradhan Mantri MUDRA Yojana",
      category: "MSME",
      businessTypes: ["Sole Proprietorship", "Partnership", "MSME"],
      description: "Funding for micro and small enterprises",
      benefits: [
        "Shishu: Up to ₹50,000",
        "Kishore: ₹50,000 to ₹5 lakh",
        "Tarun: ₹5 lakh to ₹10 lakh",
      ],
      eligibility: "Non-corporate, non-farm small/micro enterprises",
      loanAmount: "₹50,000 - ₹10,00,000",
      subsidyRate: "Variable",
      processingTime: "7-15 days",
      rating: 4.7,
      applicationsCount: "3.8M+",
      featured: true,
    },
    {
      id: 3,
      name: "Stand-Up India Scheme",
      category: "SC/ST/Women",
      businessTypes: ["Sole Proprietorship", "Partnership"],
      description: "Bank loans for SC/ST/Women entrepreneurs",
      benefits: [
        "Loans between ₹10 lakh to ₹1 crore",
        "Composite loan facility",
        "Lower margin money requirements",
      ],
      eligibility: "SC/ST/Women aged 18+ with new business idea",
      loanAmount: "₹10,00,000 - ₹1,00,00,000",
      subsidyRate: "2-3%",
      processingTime: "30-45 days",
      rating: 4.2,
      applicationsCount: "1.2M+",
      featured: false,
    },
    {
      id: 4,
      name: "Startup India Seed Fund",
      category: "Startups",
      businessTypes: ["DPIIT Startup"],
      description: "Funding support for early-stage startups",
      benefits: [
        "Seed funding up to ₹20 lakh",
        "3-year income tax exemption",
        "Faster patent examination",
      ],
      eligibility: "DPIIT-recognized startups less than 2 years old",
      loanAmount: "₹5,00,000 - ₹20,00,000",
      subsidyRate: "Grant",
      processingTime: "45-60 days",
      rating: 4.8,
      applicationsCount: "85K+",
      featured: true,
    },
    {
      id: 5,
      name: "Delhi Startup Policy",
      category: "Delhi State",
      businessTypes: ["DPIIT Startup"],
      description: "Delhi government support for startups",
      benefits: [
        "Subsidy on rent for incubation",
        "Reimbursement of registration fees",
        "Marketing support",
      ],
      eligibility: "Startups registered in Delhi",
      loanAmount: "₹2,00,000 - ₹15,00,000",
      subsidyRate: "50%",
      processingTime: "30-45 days",
      rating: 4.3,
      applicationsCount: "12K+",
      featured: false,
    },
    {
      id: 6,
      name: "PM Formalization of Micro Food Processing Enterprises",
      category: "Food Processing",
      businessTypes: ["MSME", "Sole Proprietorship"],
      description: "Support for micro food processing units",
      benefits: [
        "35% credit-linked subsidy",
        "Technical support and training",
        "Brand building assistance",
      ],
      eligibility: "Existing unorganized food processing enterprises",
      loanAmount: "₹1,00,000 - ₹10,00,000",
      subsidyRate: "35%",
      processingTime: "20-30 days",
      rating: 4.4,
      applicationsCount: "180K+",
      featured: false,
    },
  ];

  const categories = [
    "all",
    "MSME",
    "Startups",
    "Street Vendors",
    "SC/ST/Women",
    "Delhi State",
    "Food Processing",
  ];

  const businessTypes = [
    "all",
    "Sole Proprietorship",
    "Partnership",
    "MSME",
    "DPIIT Startup",
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || scheme.category === selectedCategory;
    const matchesBusinessType =
      selectedBusinessType === "all" ||
      scheme.businessTypes.includes(selectedBusinessType);

    return matchesSearch && matchesCategory && matchesBusinessType;
  });

  const featuredSchemes = filteredSchemes.filter((scheme) => scheme.featured);

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
      <section className="py-16 bg-gradient-to-r from-accent to-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Government Schemes Dashboard
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Discover and compare government schemes tailored for your business
              type. Find funding opportunities, subsidies, and support programs.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search schemes by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedBusinessType}
                  onValueChange={setSelectedBusinessType}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Business Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      {featuredSchemes.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <Star className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">
                  Featured Schemes
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredSchemes.map((scheme) => (
                  <Card
                    key={scheme.id}
                    className="border-2 border-accent/30 bg-accent/5 hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-accent text-accent-foreground">
                          Featured
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-accent" />
                          <span className="text-sm font-medium">
                            {scheme.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-xl text-foreground">
                        {scheme.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {scheme.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Loan Amount</p>
                          <p className="font-semibold text-foreground">
                            {scheme.loanAmount}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Processing Time
                          </p>
                          <p className="font-semibold text-foreground">
                            {scheme.processingTime}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Key Benefits:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {scheme.benefits.slice(0, 2).map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button className="flex-1 bg-primary hover:bg-primary/90">
                          Apply Now
                        </Button>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Schemes */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                All Schemes ({filteredSchemes.length})
              </h2>
              <Select defaultValue="rating">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="amount">Loan Amount</SelectItem>
                  <SelectItem value="time">Processing Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {filteredSchemes.map((scheme) => (
                <Card
                  key={scheme.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl text-foreground">
                            {scheme.name}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {scheme.category}
                          </Badge>
                          {scheme.featured && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base mb-4">
                          {scheme.description}
                        </CardDescription>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {scheme.businessTypes.map((type, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 text-accent" />
                          <span className="font-medium">{scheme.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({scheme.applicationsCount})
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      {/* Loan Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">
                          Loan Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Amount:
                            </span>
                            <span className="font-medium">
                              {scheme.loanAmount}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Subsidy:
                            </span>
                            <span className="font-medium text-accent">
                              {scheme.subsidyRate}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Processing:
                            </span>
                            <span className="font-medium">
                              {scheme.processingTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">
                          Key Benefits
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {scheme.benefits.map((benefit, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <CheckCircle className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Eligibility */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">
                          Eligibility
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {scheme.eligibility}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-primary hover:bg-primary/90">
                        Apply for This Scheme
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline">View Full Details</Button>
                      <Button variant="outline">Compare</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Need Personalized Recommendations?
            </h2>
            <p className="text-xl text-background/80 mb-8">
              Our experts can help you identify the best schemes for your
              specific business type, industry, and growth stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Expert Consultation
              </Button>
              <Link to="/business-type">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-background text-background hover:bg-background hover:text-foreground"
                >
                  Start Business Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
