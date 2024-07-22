"use client";
import { redirect } from "next/navigation";

export default function Home() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      return redirect("/dashboard");
    } else {
      return redirect("/auth");
    }
  }
}
