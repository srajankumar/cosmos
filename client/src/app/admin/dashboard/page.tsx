"use client";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

import { Workflow } from "lucide-react";

interface DriverInfo {
  _id: string;
  name: string;
  phone: string;
  imageUrl: string;
  busID: string;
  routeID: string;
}

interface VehicleInfo {
  _id: string;
  vehicleID: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
}

import EmployeeList from "@/components/employee/employeeList";

import ThemeToggle from "@/components/ThemeToggle";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";

import AuthButton from "@/components/admin/AuthButton";
import DriverInfo from "@/components/employee/EmployeeInfo";
import AcceptedEmployees from "@/components/employee/AcceptedEmployees";
import RejectedEmployees from "@/components/employee/RejectedEmployees";
import EmployeeSearch from "@/components/employee/employeeSearch";

export default function DashboardPage() {
  const [driverInformation, setDriverInformation] = useState<DriverInfo[]>([]);
  const [vehicleInformation, setVehicleInformation] = useState<VehicleInfo[]>(
    []
  );
  const [cookies] = useCookies(["username"]);
  const userName = cookies.username;

  useEffect(() => {
    const fetchDriverInfo = async () => {
      try {
        const response = await axios.get(`${serverUrl}/driver/info`);
        setDriverInformation(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchVehicleInfo = async () => {
      try {
        const response = await axios.get(`${serverUrl}/vehicle/info`);
        setVehicleInformation(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDriverInfo();
    fetchVehicleInfo();
  }, []);

  const driversWithBusIDZero = driverInformation.filter(
    (driver) => driver.busID === "0"
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [interest, setInterest] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${serverUrl}/driver/register`, {
        name,
        email,
        phone,
        experience,
        qualification,
        interest,
        country,
        website,
      });

      alert("Application sent Successfully");
      setSubmitted(true);

      // Clear the form inputs
      setName("");
      setEmail("");
      setPhone("");
      setExperience("");
      setQualification("");
      setInterest("");
      setCountry("");
      setWebsite("");
    } catch (err) {
      console.error(err);
    }
  };

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverUrl}/driver/`);
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
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
                Onboard
              </TabsTrigger>
              <TabsTrigger
                className="md:my-0 shadow-lg ml-3 rounded-full px-10 my-1"
                value="waiting"
              >
                Waiting
              </TabsTrigger>
              <TabsTrigger
                className="md:my-0 shadow-lg ml-3 rounded-full px-10 my-1 mr-1 md:mr-0"
                value="rejected"
              >
                DB
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="space-y-4 md:space-x-6 flex md:flex-row flex-col"
            >
              <div className="lg:w-1/2 w-full">
                <div className="bg-pink-500/10 dark:bg-pink-200 rounded-2xl flex flex-col items-center mt-7 py-5">
                  <p className="text-3xl font-medium text-gray-500">Welcome,</p>
                  <p className="text-3xl font-medium dark:text-black">
                    {userName}
                  </p>
                </div>
                <div className="pt-5">
                  <EmployeeList drivers={drivers} />
                </div>
              </div>
              <div className="flex pt-2 lg:w-1/2 w-full">
                <EmployeeSearch drivers={drivers} />
              </div>
            </TabsContent>
            <TabsContent value="onboard" className="space-y-4">
              <AcceptedEmployees drivers={drivers} />
            </TabsContent>
            <TabsContent value="waiting" className="space-y-4">
              <DriverInfo drivers={drivers} />
            </TabsContent>
            <TabsContent value="rejected" className="space-y-4">
              <RejectedEmployees drivers={drivers} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
