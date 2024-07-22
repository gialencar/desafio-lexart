"use client"
import { redirect } from "next/navigation";

export default function Home() {
  const token = localStorage.getItem("token");

  if (token) {
    return redirect("/dashboard");
  } else {
    return redirect("/auth");
  }
}
