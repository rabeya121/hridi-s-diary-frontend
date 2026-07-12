"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    } else if (!isLoading && adminOnly && user?.role !== "admin") {
      router.push("/");
    }
  }, [isLoading, user, adminOnly, router]);

  if (isLoading || !user || (adminOnly && user.role !== "admin")) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-velvet">
        <p className="font-body text-sm text-ivory/50">Checking access...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;