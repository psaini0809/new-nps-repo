import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; // ✅ using Sonner toast

export const ProtectedRoute = ({ element, allowedRoles }) => {
  const { data: user, isLoading, isError } = useAuth();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );

  if (isError || !user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Role-based access handling
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If admin tries to access owner/user-only routes
    if (user.role === "admin") {
      toast.error("You cannot access owner routes");
      return <Navigate to="/admin" replace />;
    }

    // If normal user tries to access admin routes
    if (user.role === "user" || user.role === "customer" || user.role === "owner") {
      toast.error("You cannot access admin routes");
      return <Navigate to="/" replace />;
    }

    // Default fallback for other roles
    toast.error("Access denied");
    return <Navigate to="/" replace />;
  }

  return element;
};
