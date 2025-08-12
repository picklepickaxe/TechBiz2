import PlaceholderPage from "@/components/PlaceholderPage";

export default function Summary() {
  const features = [
    "Progress dashboard with visual timeline",
    "Downloadable compliance checklist",
    "Personalized scheme recommendations",
    "Document management system",
    "Integration with government portals",
    "Automated renewal reminders",
    "Business growth analytics",
  ];

  return (
    <PlaceholderPage
      title="Progress Summary Dashboard"
      description="A comprehensive dashboard to track your business registration progress, view completed steps, manage documents, and get personalized recommendations for next steps."
      features={features}
    />
  );
}
