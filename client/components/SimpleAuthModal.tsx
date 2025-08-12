import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useState } from "react";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";

interface SimpleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function SimpleAuthModal({
  isOpen,
  onClose,
  defaultTab = "login",
}: SimpleAuthModalProps) {
  const [currentTab, setCurrentTab] = useState<"login" | "signup">(defaultTab);

  const handleSwitchToSignup = () => {
    setCurrentTab("signup");
  };

  const handleSwitchToLogin = () => {
    setCurrentTab("login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-background border-primary/20">
        <div className="p-6">
          {currentTab === "login" ? (
            <LoginCard onClose={onClose} onSwitchToSignup={handleSwitchToSignup} />
          ) : (
            <SignupCard onClose={onClose} onSwitchToLogin={handleSwitchToLogin} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}