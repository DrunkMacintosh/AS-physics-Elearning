import { redirect } from "next/navigation";

// Root page redirects to the student home or auth
export default function RootPage() {
  redirect("/login");
}
