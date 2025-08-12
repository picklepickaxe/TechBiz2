import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = "login",
}: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-card border-primary/20">
        <div className="relative">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <div className="p-2 bg-primary rounded-full">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              Welcome to TechBiz
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 pt-2">
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-primary/10">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-primary data-[state=active]:text-techbiz-black"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-techbiz-black"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader className="px-0 pb-4">
                    <CardDescription className="text-center text-muted-foreground">
                      Continue your business journey with TechBiz
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-foreground font-medium"
                        >
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 border-primary/30 focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-foreground font-medium"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 border-primary/30 focus:border-primary"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-primary" />
                            ) : (
                              <Eye className="h-4 w-4 text-primary" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                            Signing In...
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>

                    <div className="text-center">
                      <Button
                        variant="link"
                        className="text-primary hover:text-primary-light"
                      >
                        Forgot your password?
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader className="px-0 pb-4">
                    <CardDescription className="text-center text-muted-foreground">
                      Start your business journey with TechBiz today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-foreground font-medium"
                          >
                            First Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                            <Input
                              id="firstName"
                              placeholder="First name"
                              className="pl-10 border-primary/30 focus:border-primary"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-foreground font-medium"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Last name"
                            className="border-primary/30 focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="signupEmail"
                          className="text-foreground font-medium"
                        >
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                          <Input
                            id="signupEmail"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 border-primary/30 focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-foreground font-medium"
                        >
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="pl-10 border-primary/30 focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="signupPassword"
                          className="text-foreground font-medium"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                          <Input
                            id="signupPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 pr-10 border-primary/30 focus:border-primary"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-primary" />
                            ) : (
                              <Eye className="h-4 w-4 text-primary" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                            Creating Account...
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                      By signing up, you agree to our{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary hover:text-primary-light"
                      >
                        Terms of Service
                      </Button>{" "}
                      and{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary hover:text-primary-light"
                      >
                        Privacy Policy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
