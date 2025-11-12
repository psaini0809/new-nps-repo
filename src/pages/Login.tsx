import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import loginVector from "@/assets/login.jpg";
import { useLogin, useRegister, useLogout, useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react"; // ⭐ NEW
import SocialSidebar from "@/components/socialSidebar";

// --- Validation Schemas ---
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // ⭐ NEW
  const navigate = useNavigate();

  const { data: user } = useAuth();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  // --- Form Submit Handler ---
  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        await loginMutation.mutateAsync({ email: data.email, password: data.password });
        toast.success("Login successful!");
      } else {
        await registerMutation.mutateAsync({
          fullName: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        });
        toast.success("Account created successfully!");
      }
      reset();
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // --- Logout Handler ---
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Logged out successfully!");
      // ⭐ NEW: reload page & redirect home
      window.location.href = "/";
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <SocialSidebar/>

      <main className="flex-1 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 max-w-5xl mx-auto">
            {/* Left: Vector Image */}
            <div className="hidden lg:flex flex-1 justify-center items-center rounded-xl">
              <img
                src={loginVector}
                alt="Login Illustration"
                className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Right: Form / Logout */}
            <div className="flex-1">
              {user ? (
                // --- Logged in view ---
                <Card className="p-8 shadow-lg rounded-2xl text-center">
                  <h2 className="text-2xl font-bold mb-4">Hello, {user.fullName}!</h2>
                  <p className="text-muted-foreground mb-6">
                    You are logged in as <strong>{user.role}</strong>
                  </p>
                  <Button onClick={handleLogout} variant="gold" size="lg" className="w-full">
                    Logout
                  </Button>
                </Card>
              ) : (
                // --- Login / Signup Form ---
                <Card className="p-8 shadow-lg rounded-2xl">
                  <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl font-bold mb-2">
                      {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-muted-foreground">
                      {isLogin
                        ? "Sign in to access your customer dashboard"
                        : "Join NPS to explore exclusive properties"}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {!isLogin && (
                      <>
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <Input id="name" {...register("name")} placeholder="John Doe" />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <Input id="phone" {...register("phone")} placeholder="9876543210" />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                          )}
                        </div>
                      </>
                    )}

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* ⭐ Password with Eye Toggle */}
                    <div className="relative">
                      <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="••••••••"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                      )}
                    </div>

                    <Button type="submit" variant="gold" size="lg" className="w-full">
                      {isLogin ? "Sign In" : "Create Account"}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-gold hover:underline font-medium"
                      >
                        {isLogin ? "Sign up" : "Sign in"}
                      </button>
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
