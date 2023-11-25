"use client";
// Import necessary modules
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import AuthButton from "@/components/employee/AuthButton";

import { Workflow } from "lucide-react";

// DashboardPage component
export default function DashboardPage() {
  // State to manage the visibility of the popup
  const [popupVisible, setPopupVisible] = useState(false);

  // State to manage the logout timer
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  // Function to show the popup
  const showPopup = () => {
    setPopupVisible(true);

    // Set a timer for 5 seconds
    setLogoutTimer(
      setTimeout(() => {
        // Trigger logout and redirect after 5 seconds of inactivity
        logoutAndRedirect();
      }, 5000)
    );
  };

  // Function to handle popup interaction
  const handlePopupInteraction = () => {
    setPopupVisible(false);

    // Clear the logout timer when the user interacts with the popup
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    // Set a new timer to enable the popup after 10 seconds
    setLogoutTimer(
      setTimeout(() => {
        showPopup();
      }, 10000)
    );
  };

  // Function to handle logout and redirect
  const logoutAndRedirect = () => {
    // Remove user token (replace this with your actual logic)
    localStorage.removeItem("userToken");

    // Redirect to the specified page
    window.location.href = "/";
  };

  // Effect to show the popup every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      showPopup();
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Effect to trigger logout if the user doesn't interact with the popup
  useEffect(() => {
    if (popupVisible) {
      // Set a timer for 5 seconds
      const timeoutId = setTimeout(() => {
        // Trigger logout and redirect after 5 seconds of inactivity
        logoutAndRedirect();
      }, 5000);

      // Cleanup timer on component unmount or popup interaction
      return () => clearTimeout(timeoutId);
    }
  }, [popupVisible]);

  // Retrieve username from cookies
  const [cookies] = useCookies(["username"]);
  const userName = cookies.username;

  // JSX structure
  return (
    <>
      {popupVisible && (
        <div className="absolute top-5 left-5 z-30 text-white bg-green-500/50 border-2 border-green-700 px-5 py-2 rounded-lg backdrop-blur-lg popup">
          <h2>Attention!</h2>
          <p>Are you still working?</p>
          <button
            className="bg-white hover:bg-gray-300 transition-colors duration-300 px-3 rounded-md text-black mt-1 py-1"
            onClick={handlePopupInteraction}
          >
            Yes
          </button>
        </div>
      )}
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex space-x-4 justify-center items-center">
              <Workflow className="w-10 h-10 p-1.5 rounded-lg bg-gradient-to-br from-violet-400 text-white to-violet-800" />
              <h2 className="text-2xl font-bold tracking-tight">Cosmos</h2>
            </div>
            <div className="flex items-center space-x-2">
              <AuthButton />
              <ThemeToggle />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="md:flex rounded-full md:text-xl md:justify-start grid grid-cols-3 py-8">
              <TabsTrigger
                className="md:my-0 shadow-lg rounded-full ml-3 px-10 py-2 my-1 mr-1 md:mr-0"
                value="overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                className="md:my-0 shadow-lg ml-3 rounded-full px-10 my-1 mr-1 md:mr-0"
                value="onboard"
              >
                Milestones
              </TabsTrigger>
              <TabsTrigger
                className="md:my-0 shadow-lg ml-3 rounded-full px-10 my-1"
                value="waiting"
              >
                Progress
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </>
  );
}
