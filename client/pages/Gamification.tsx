import PlaceholderPage from "@/components/PlaceholderPage";

export default function Gamification() {
  const features = [
    "Level-based business journey progression",
    "Achievement badges for completed milestones",
    "Interactive learning modules",
    "Progress rewards and incentives",
    "Leaderboard for business community",
    "Gamified compliance training",
    "Social sharing of achievements",
  ];

  return (
    <PlaceholderPage
      title="Gamified Business Learning"
      description="Make your business journey engaging with our gamified learning platform. Unlock levels, earn badges, and compete with other entrepreneurs while learning about business compliance."
      features={features}
    />
  );
}
