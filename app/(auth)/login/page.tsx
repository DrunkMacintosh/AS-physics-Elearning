"use client";

import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  return (
    <AuthCard
      onLogin={(username, isTeacher) => {
        if (isTeacher) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/home";
        }
      }}
    />
  );
}
