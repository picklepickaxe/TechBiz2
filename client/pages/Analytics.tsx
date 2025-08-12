import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Papa from "papaparse"; // at the top if not already imported
import { useState, useRef } from "react";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import AIDataAnalyst from "@/components/AIDataAnalyst";
import {
  Building2,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Download,
  Upload,
  ChevronLeft,
  Brain,
  Zap,
  Target,
  DollarSign,
  Calendar,
  Users,
  FileText,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function Analytics() {
  const [selectedDataset, setSelectedDataset] = useState(
    "business-registrations",
  );
  const [aiAnalysisVisible, setAiAnalysisVisible] = useState(false);

  const [uploadedData, setUploadedData] = useState(null);
const [uploadedDataName, setUploadedDataName] = useState("");
const [chatMessages, setChatMessages] = useState([]); // { sender: 'user'|'bot', text: string }
const [userQuestion, setUserQuestion] = useState("");
const [loadingAnswer, setLoadingAnswer] = useState(false);

const fileInputRef = useRef(null);
const chatEndRef = useRef(null);

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
    alert("Please upload a valid CSV file.");
    return;
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      setUploadedData(results.data);
      setUploadedDataName(file.name);
      setChatMessages([]);
      // optionally clear or reset other states
    },
    error: function (error) {
      alert("Error parsing CSV: " + error.message);
    },
  });
}

function datasetToSummary(data) {
  if (!data || data.length === 0) return "Dataset is empty.";

  const keys = Object.keys(data[0]);
  let summary = `The dataset has ${data.length} rows and ${keys.length} columns: ${keys.join(", ")}.\nExample rows:\n`;

  data.slice(0, 5).forEach((row, i) => {
    summary += `Row ${i + 1}: `;
    summary += keys.map((k) => `${k} = ${row[k]}`).join(", ");
    summary += "\n";
  });

  return summary;
}

async function askQuestion() {
  if (!userQuestion.trim()) return;
  if (!uploadedData || uploadedData.length === 0) {
    alert("Please upload a dataset first.");
    return;
  }

  setLoadingAnswer(true);

  setChatMessages((prev) => [...prev, { sender: "user", text: userQuestion }]);

  const datasetSummary = datasetToSummary(uploadedData);

  try {
    const res = await fetch("/api/gpt-query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datasetSummary,
        question: userQuestion,
      }),
    });

    if (!res.ok) throw new Error(`Server error: ${res.statusText}`);

    const data = await res.json();

    setChatMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
  } catch (error) {
    setChatMessages((prev) => [
      ...prev,
      { sender: "bot", text: `Error: ${error.message}` },
    ]);
  } finally {
    setLoadingAnswer(false);
    setUserQuestion("");
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}


  // Example datasets for business analytics
  const datasets = {
    "business-registrations": {
      name: "Business Registration Trends",
      description:
        "Monthly business registration data across different business types",
      data: [
        {
          month: "Jan",
          soleProprietorship: 245,
          partnership: 89,
          msme: 167,
          startup: 34,
        },
        {
          month: "Feb",
          soleProprietorship: 267,
          partnership: 98,
          msme: 184,
          startup: 42,
        },
        {
          month: "Mar",
          soleProprietorship: 289,
          partnership: 112,
          msme: 201,
          startup: 56,
        },
        {
          month: "Apr",
          soleProprietorship: 312,
          partnership: 125,
          msme: 234,
          startup: 67,
        },
        {
          month: "May",
          soleProprietorship: 334,
          partnership: 143,
          msme: 267,
          startup: 78,
        },
        {
          month: "Jun",
          soleProprietorship: 356,
          partnership: 156,
          msme: 289,
          startup: 89,
        },
        {
          month: "Jul",
          soleProprietorship: 378,
          partnership: 167,
          msme: 312,
          startup: 95,
        },
        {
          month: "Aug",
          soleProprietorship: 398,
          partnership: 178,
          msme: 334,
          startup: 103,
        },
        {
          month: "Sep",
          soleProprietorship: 412,
          partnership: 189,
          msme: 356,
          startup: 112,
        },
        {
          month: "Oct",
          soleProprietorship: 434,
          partnership: 201,
          msme: 378,
          startup: 125,
        },
        {
          month: "Nov",
          soleProprietorship: 456,
          partnership: 213,
          msme: 398,
          startup: 134,
        },
        {
          month: "Dec",
          soleProprietorship: 478,
          partnership: 225,
          msme: 423,
          startup: 145,
        },
      ],
    },
    "scheme-performance": {
      name: "Government Scheme Performance",
      description:
        "Success rates and funding amounts across different government schemes",
      data: [
        {
          scheme: "PM MUDRA",
          applicants: 2450,
          approved: 2205,
          funding: 125000000,
          successRate: 90,
        },
        {
          scheme: "Stand-Up India",
          applicants: 1240,
          approved: 1054,
          funding: 89000000,
          successRate: 85,
        },
        {
          scheme: "PM SVANidhi",
          applicants: 3200,
          approved: 2880,
          funding: 67000000,
          successRate: 90,
        },
        {
          scheme: "Startup India",
          applicants: 890,
          approved: 623,
          funding: 156000000,
          successRate: 70,
        },
        {
          scheme: "MSME Support",
          applicants: 1890,
          approved: 1701,
          funding: 98000000,
          successRate: 90,
        },
      ],
    },
    "compliance-tracking": {
      name: "Compliance & License Tracking",
      description: "License application processing times and compliance rates",
      data: [
        {
          license: "GST",
          avgProcessingDays: 5,
          complianceRate: 94,
          applications: 1250,
        },
        {
          license: "Shop & Establishment",
          avgProcessingDays: 12,
          complianceRate: 87,
          applications: 890,
        },
        {
          license: "FSSAI",
          avgProcessingDays: 15,
          complianceRate: 92,
          applications: 567,
        },
        {
          license: "Professional Tax",
          avgProcessingDays: 7,
          complianceRate: 96,
          applications: 1120,
        },
        {
          license: "Import Export",
          avgProcessingDays: 21,
          complianceRate: 89,
          applications: 234,
        },
        {
          license: "Pollution Control",
          avgProcessingDays: 30,
          complianceRate: 85,
          applications: 345,
        },
      ],
    },
    "revenue-analysis": {
      name: "Business Revenue Analytics",
      description: "Revenue trends across different business sectors and sizes",
      data: [
        {
          sector: "Tech",
          micro: 450000,
          small: 1200000,
          medium: 3500000,
          growth: 15.2,
        },
        {
          sector: "Manufacturing",
          micro: 380000,
          small: 980000,
          medium: 2800000,
          growth: 8.7,
        },
        {
          sector: "Retail",
          micro: 320000,
          small: 750000,
          medium: 1900000,
          growth: 6.3,
        },
        {
          sector: "Services",
          micro: 290000,
          small: 680000,
          medium: 1650000,
          growth: 11.8,
        },
        {
          sector: "Food & Beverage",
          micro: 250000,
          small: 590000,
          medium: 1420000,
          growth: 9.4,
        },
        {
          sector: "Healthcare",
          micro: 410000,
          small: 1100000,
          medium: 2950000,
          growth: 13.6,
        },
      ],
    },
  };

  const currentDataset = datasets[selectedDataset];

  const COLORS = ["#1174ba", "#205ba6", "#2f4b92", "#3e3b7e", "#4d2b6a"];

  const aiAnalysis = {
    "business-registrations": {
      insights: [
        "MSME registrations show strongest growth trend (+34% YoY)",
        "Startup registrations accelerating in Q4 (+67% vs Q1)",
        "Sole proprietorships remain the most popular choice (45% of total)",
        "Partnership registrations showing steady 12% quarterly growth",
      ],
      predictions: [
        "Projected 25% increase in total registrations next quarter",
        "MSME category likely to surpass sole proprietorships by Q2 2025",
        "Startup registrations may reach 200/month by year-end",
        "Digital adoption driving faster processing times",
      ],
      recommendations: [
        "Increase MSME awareness campaigns during peak seasons",
        "Streamline startup registration process to capture growth",
        "Develop targeted support for partnership formations",
        "Implement predictive analytics for resource planning",
      ],
    },
    "scheme-performance": {
      insights: [
        "PM MUDRA and PM SVANidhi show highest success rates (90%)",
        "Startup India has lower approval rate but highest average funding",
        "Total funding deployed: ₹535 crores across all schemes",
        "Processing efficiency improved 23% over last quarter",
      ],
      predictions: [
        "PM MUDRA demand expected to grow 18% next quarter",
        "Startup India approval rates may improve with policy changes",
        "Overall scheme utilization projected to increase 15%",
        "Digital verification could reduce processing time by 30%",
      ],
      recommendations: [
        "Optimize Startup India evaluation criteria",
        "Increase PM SVANidhi funding allocation",
        "Implement AI-powered application screening",
        "Develop sector-specific scheme variants",
      ],
    },
  };

  const renderChart = (type: string) => {
    const data = currentDataset.data;

    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(data[0])
                .slice(1)
                .map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(data[0])
                .slice(1)
                .map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                  />
                ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(data[0])
                .slice(1)
                .map((key, index) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stackId="1"
                    stroke={COLORS[index % COLORS.length]}
                    fill={COLORS[index % COLORS.length]}
                    fillOpacity={0.6}
                  />
                ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case "pie":
        const pieData = Object.keys(data[0])
          .slice(1)
          .map((key, index) => ({
            name: key,
            value: data.reduce((sum, item) => sum + (item[key] || 0), 0),
            fill: COLORS[index % COLORS.length],
          }));

        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Chart type not supported</div>;
    }
  };

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
              Business Analytics Dashboard
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Analyze your business data with AI-powered insights and
              interactive visualizations. Upload your datasets or explore our
              example business data.
            </p>
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              <AlertCircle className="h-3 w-3 mr-1" />
              Currently showing example data for demonstration
            </Badge>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Dataset Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Choose Dataset</Label>
                    <Select
                      value={selectedDataset}
                      onValueChange={setSelectedDataset}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(datasets).map(([key, dataset]) => (
                          <SelectItem key={key} value={key}>
                            {dataset.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentDataset.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
  variant="outline"
  size="sm"
  onClick={() => fileInputRef.current?.click()}
>
  <Upload className="h-4 w-4 mr-2" />
  Upload Data (CSV only)
</Button>

<input
  type="file"
  accept=".csv,text/csv"
  style={{ display: "none" }}
  ref={fileInputRef}
  onChange={handleFileUpload}
/>

                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get AI-powered insights, predictions, and recommendations
                    based on your data patterns.
                  </p>
                  <Button
                    onClick={() => setAiAnalysisVisible(!aiAnalysisVisible)}
                    className="w-full"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {aiAnalysisVisible ? "Hide" : "Generate"} AI Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* AI Analysis Results */}
             
            <div id="ai-analyst" className="mb-8">
  <h2 className="text-2xl font-bold text-foreground mb-6">
    AI Data Analyst
  </h2>
  <AIDataAnalyst
    dataset={currentDataset.data}
    datasetName={currentDataset.name}
    datasetDescription={currentDataset.description}
  />
</div>

<div className="mt-6 max-w-3xl mx-auto">
  <div
    className="border rounded-md p-4 h-64 overflow-y-auto bg-white dark:bg-gray-800"
    style={{ minHeight: "250px" }}
  >
    {chatMessages.length === 0 && (
      <p className="text-muted-foreground text-center mt-24">
        Ask questions about your uploaded dataset below!
      </p>
    )}

    {chatMessages.map((msg, i) => (
      <div
        key={i}
        className={`mb-3 p-2 rounded ${
          msg.sender === "user"
            ? "bg-blue-100 text-blue-900 text-right"
            : "bg-gray-100 text-gray-900 text-left"
        }`}
      >
        <p>{msg.text}</p>
      </div>
    ))}

    <div ref={chatEndRef} />
  </div>

  <form
    className="mt-4 flex gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      askQuestion();
    }}
  >
    <input
      type="text"
      placeholder="Type your question here..."
      value={userQuestion}
      onChange={(e) => setUserQuestion(e.target.value)}
      disabled={loadingAnswer}
      className="flex-1 border rounded p-2"
    />
    <button
      type="submit"
      disabled={loadingAnswer || !userQuestion.trim()}
      className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
    >
      {loadingAnswer ? "Thinking..." : "Ask"}
    </button>
  </form>
</div>


            {aiAnalysisVisible && aiAnalysis[selectedDataset] && (
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Key Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {aiAnalysis[selectedDataset].insights.map(
                        (insight, index) => (
                          <li
                            key={index}
                            className="text-sm flex items-start gap-2"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            {insight}
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-green-500" />
                      Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {aiAnalysis[selectedDataset].predictions.map(
                        (prediction, index) => (
                          <li
                            key={index}
                            className="text-sm flex items-start gap-2"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            {prediction}
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {aiAnalysis[selectedDataset].recommendations.map(
                        (recommendation, index) => (
                          <li
                            key={index}
                            className="text-sm flex items-start gap-2"
                          >
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            {recommendation}
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Brain className="h-5 w-5 text-orange-500" />
                      AI Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ask specific questions about your data using our AI analyst.
                    </p>
                    <Button
                      onClick={() => {
                        // Scroll to AI section
                        document.getElementById('ai-analyst')?.scrollIntoView({ 
                          behavior: 'smooth' 
                        });
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start AI Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* AI Data Analyst Section */}
            <div className="mt-6 max-w-3xl mx-auto">
  <div
    className="border rounded-md p-4 h-64 overflow-y-auto bg-white dark:bg-gray-800"
    style={{ minHeight: "250px" }}
  >
    {chatMessages.length === 0 && (
      <p className="text-muted-foreground text-center mt-24">
        Ask questions about your uploaded dataset below!
      </p>
    )}

    {chatMessages.map((msg, i) => (
      <div
        key={i}
        className={`mb-3 p-2 rounded ${
          msg.sender === "user"
            ? "bg-blue-100 text-blue-900 text-right"
            : "bg-gray-100 text-gray-900 text-left"
        }`}
      >
        <p>{msg.text}</p>
      </div>
    ))}

    <div ref={chatEndRef} />
  </div>

  <form
    className="mt-4 flex gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      askQuestion();
    }}
  >
    <input
      type="text"
      placeholder="Type your question here..."
      value={userQuestion}
      onChange={(e) => setUserQuestion(e.target.value)}
      disabled={loadingAnswer}
      className="flex-1 border rounded p-2"
    />
    <button
      type="submit"
      disabled={loadingAnswer || !userQuestion.trim()}
      className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
    >
      {loadingAnswer ? "Thinking..." : "Ask"}
    </button>
  </form>
</div>


            {/* Chart Visualizations */}
            <Tabs defaultValue="bar" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Data Visualizations
                </h2>
                <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="bar" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Bar
                  </TabsTrigger>
                  <TabsTrigger value="line" className="flex items-center gap-2">
                    <LineChart className="h-4 w-4" />
                    Line
                  </TabsTrigger>
                  <TabsTrigger value="area" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Area
                  </TabsTrigger>
                  <TabsTrigger value="pie" className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Pie
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="bar">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentDataset.name} - Bar Chart</CardTitle>
                    <CardDescription>
                      Compare values across different categories with
                      interactive bar visualization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{renderChart("bar")}</CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="line">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentDataset.name} - Line Chart</CardTitle>
                    <CardDescription>
                      Track trends and patterns over time with smooth line
                      visualization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{renderChart("line")}</CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="area">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentDataset.name} - Area Chart</CardTitle>
                    <CardDescription>
                      Visualize cumulative data and proportional relationships
                      over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{renderChart("area")}</CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pie">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentDataset.name} - Pie Chart</CardTitle>
                    <CardDescription>
                      Show proportional distribution of data across different
                      segments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{renderChart("pie")}</CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Data Points
                      </p>
                      <p className="text-2xl font-bold">
                        {currentDataset.data.length}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Variables
                      </p>
                      <p className="text-2xl font-bold">
                        {Object.keys(currentDataset.data[0]).length - 1}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        AI Insights
                      </p>
                      <p className="text-2xl font-bold">
                        {aiAnalysis[selectedDataset]?.insights.length || 0}
                      </p>
                    </div>
                    <Brain className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Predictions
                      </p>
                      <p className="text-2xl font-bold">
                        {aiAnalysis[selectedDataset]?.predictions.length || 0}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}