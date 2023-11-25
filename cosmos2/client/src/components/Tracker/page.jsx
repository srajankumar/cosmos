import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

const EfficiencyTracking = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  //   const router = useRouter();

  // Simulated working hours (in military time)
  const workingHoursStart = 9;
  const workingHoursEnd = 17;

  // Function to check if the current time is within working hours
  const isWorkingHours = () => {
    const currentHour = new Date().getHours();
    return currentHour >= workingHoursStart && currentHour < workingHoursEnd;
  };

  // Function to simulate showing a random pop-up
  const showRandomPopup = () => {
    setPopupVisible(true);

    // Simulated pop-up duration (in milliseconds)
    const popupDuration = 5000; // 5 seconds

    // Hide the pop-up after the specified duration
    setTimeout(() => {
      setPopupVisible(false);
    }, popupDuration);
  };

  // Effect to check for working hours and show pop-up every 3 seconds
  useEffect(() => {
    const checkAndShowPopup = () => {
      if (isWorkingHours()) {
        // Always show the pop-up every 3 seconds
        showRandomPopup();
      }
    };

    // Check and show the pop-up every 3 seconds
    const intervalId = setInterval(checkAndShowPopup, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle user interaction with the pop-up
  const handlePopupInteraction = () => {
    // Add logic here to handle user interaction (e.g., send a request to the server)
    console.log("User interacted with the pop-up");
    setPopupVisible(false);
  };

  // Function to simulate a logout action
  const logout = () => {
    // Add logic here to perform logout (e.g., redirect to the login page)
    console.log("User logged out due to inactivity");
  };

  // Effect to trigger logout if the user doesn't interact with the pop-up
  useEffect(() => {
    if (popupVisible) {
      // Simulated timeout for user interaction (in milliseconds)
      const interactionTimeout = 10000; // 10 seconds

      // Set a timeout for the specified interaction duration
      const timeoutId = setTimeout(() => {
        // Trigger logout if the user doesn't interact with the pop-up
        logout();
      }, interactionTimeout);

      // Cleanup timeout on pop-up interaction
      return () => clearTimeout(timeoutId);
    }
  }, [popupVisible]);

  return (
    <div>
      {popupVisible && (
        <div className="popup">
          <h2>Attention!</h2>
          <p>Are you still working?</p>
          <button onClick={handlePopupInteraction}>Yes</button>
        </div>
      )}
      {/* Your component content goes here */}
    </div>
  );
};

export default EfficiencyTracking;
