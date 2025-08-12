import PlaceholderPage from "@/components/PlaceholderPage";

export default function Chatbot() {
  const features = [
    "AI-powered business guidance chatbot",
    "Real-time license requirement queries",
    "Scheme eligibility checker",
    "Document requirement assistance",
    "Compliance deadline reminders",
    "Multi-language support (Hindi, English)",
    "Integration with live expert support",
  ];

  return (
    <PlaceholderPage
      title="AI Business Assistant"
      description="An intelligent chatbot to provide instant answers about business registration, licensing requirements, scheme eligibility, and compliance guidance."
      features={features}
    />
  );
}
