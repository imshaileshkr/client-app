"use client"; // Ensure the component is treated as a client component in Next.js App Router

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, setUser] = useState<any>(null);
  const { logout, getProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // This will only run on the client side after the component is mounted
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data)); // Parse the JSON string into an object
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  const handleLogout = () => {
    logout();
    router.push("login");
  };

  // if (!user) {
  //   return <div>Loading...</div>; // Handle loading state or redirect if no user found
  // }
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getProfile();
        console.log("🚀 ~ getProfile ~ res:", res);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, []);
  return (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      <div className="w-1/2 border min-h-72 p-5 flex flex-col gap-y-5">
        <div className="mb-2 border-b">
          <h1 className="text-2xl text-white text-center">Profile</h1>
        </div>
        <h1 className="text-white text-lg">Name: {user?.name ?? ""}</h1>
        <h1 className="text-white text-lg">Email: {user?.email ?? ""}</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-md bg-green-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Page;
