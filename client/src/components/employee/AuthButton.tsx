import { Button } from "@/components/ui/button";
import React from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const DriverAuthButton = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = async () => {
    const startTime = window.localStorage.getItem("timerStartTime");
    if (startTime) {
      // Calculate session duration
      const endTime = Date.now();
      const duration = Math.floor((endTime - parseInt(startTime)) / 1000); // in seconds

      // Convert duration to hours, minutes, seconds
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;

      const formattedDuration = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      // Show alert with session duration
      alert(`You were signed in for: ${formattedDuration}`);
      // alert(formattedDuration);
      await axios.post(`${serverUrl}/storeDuration/time`, {
        formattedDuration,
      });
    }

    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.location.href = "/";
  };

  return (
    <div>
      <Button onClick={logout} variant="destructive">
        Logout
      </Button>
    </div>
  );
};

export default DriverAuthButton;
