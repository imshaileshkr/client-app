"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
    }
  });
  return <div>{children}</div>;
};

export default RootTemplate;
