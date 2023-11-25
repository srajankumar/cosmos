"use client";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";

import AuthButton from "@/components/employee/AuthButton";

export default function DashboardPage() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);

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

  const handlePopupInteraction = () => {
    setPopupVisible(false);

    // Clear the logout timer when the user interacts with the popup
    clearTimeout(logoutTimer);

    // Set a new timer to enable the popup after 10 seconds
    setTimeout(() => {
      showPopup();
    }, 10000);
  };

  const logoutAndRedirect = () => {
    // Remove user token (replace this with your actual logic)
    localStorage.removeItem("userToken");

    // Redirect to the specified page
    window.location.href = "/";
  };

  // Effect to show pop-up every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      showPopup();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Effect to trigger logout if the user doesn't interact with the pop-up
  useEffect(() => {
    if (popupVisible) {
      // Set a timer for 5 seconds
      setLogoutTimer(
        setTimeout(() => {
          // Trigger logout and redirect after 5 seconds of inactivity
          logoutAndRedirect();
        }, 5000)
      );

      // Cleanup timer on component unmount
      return () => clearTimeout(logoutTimer);
    }
  }, [popupVisible]);

  const [cookies] = useCookies(["username"]);
  const loginName = cookies.username;

  return (
    <>
      {/* <div className="md:hidden flex w-full h-screen justify-center items-center text-3xl font-bold">
        <h1>Not Supported</h1>
      </div> */}

      {popupVisible && (
        <div className="popup">
          <h2>Attention!</h2>
          <p>Are you still working?</p>
          <button onClick={handlePopupInteraction}>Yes</button>
        </div>
      )}
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <div className="md:flex hidden">
                <CalendarDateRangePicker />
              </div>
              <ThemeToggle />
              <AuthButton />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Task</TabsTrigger>
              <TabsTrigger value="route">Task</TabsTrigger>
              <TabsTrigger value="parking">Task</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </>
  );
}
