"use client";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";

import Schedule from "@/components/driver/Schedule";
import Vehicle from "@/components/driver/Vehicle";
import Map from "@/components/driver/Map";
import RouteMap from "@/components/driver/Route";
import DriverAuthButton from "@/components/driver/DriverAuthButton";
import EfficiencyTracking from "@/components/Tracker/page";
import { SavedInfo } from "@/components/driver/Profile";
import { Bio } from "@/components/driver/Bio";

export default function DashboardPage() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [disablePopup, setDisablePopup] = useState(false);

  // Function to show pop-up
  const showPopup = () => {
    if (!disablePopup) {
      setPopupVisible(true);

      // Hide the pop-up after 5 seconds
      const popupTimeout = setTimeout(() => {
        setPopupVisible(false);

        // Enable pop-up after 10 seconds
        setTimeout(() => {
          setDisablePopup(false);
        }, 10000);
      }, 5000);
    }
  };

  // Effect to show pop-up every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      showPopup();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [disablePopup]);

  // Function to handle close button click
  const handlePopupInteraction = () => {
    setPopupVisible(false);

    // Enable pop-up after 10 seconds
    setTimeout(() => {
      setDisablePopup(false);
    }, 10000);
  };

  // Function to handle logout and redirect
  const logoutAndRedirect = () => {
    // Remove user token (replace this with your actual logic)
    localStorage.removeItem("userToken");

    // Redirect to the specified page
    window.location.href = "/";
  };

  // Effect to trigger logout if the user doesn't interact with the pop-up
  useEffect(() => {
    if (popupVisible) {
      // Set a timeout for 4 seconds
      const logoutTimeout = setTimeout(() => {
        // Trigger logout and redirect if the user doesn't interact with the pop-up
        logoutAndRedirect();
      }, 4000);

      // Cleanup timeout on pop-up interaction or component unmount
      return () => clearTimeout(logoutTimeout);
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
              <DriverAuthButton />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="route">Route</TabsTrigger>
              <TabsTrigger value="parking">Parking</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SavedInfo userName={loginName} />
                  </CardContent>
                </Card>
                <Card className="col-span-4 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Your Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Schedule userName={loginName} />
                  </CardContent>
                </Card>
                <Card className="col-span-4 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Vehicle userName={loginName} />
                  </CardContent>
                </Card>
                <Card className="col-span-4 lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Bio userName={loginName} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="route" className="space-y-4">
              <RouteMap userName={loginName} />
            </TabsContent>
            <TabsContent value="parking" className="space-y-4">
              <Map userName={loginName} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
