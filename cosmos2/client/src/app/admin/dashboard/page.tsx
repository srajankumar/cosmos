"use client";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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

import ThemeToggle from "@/components/ThemeToggle";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";

import Map from "@/components/admin/Map";

import { Overview } from "@/components/admin/overview";
import { RecentSales } from "@/components/admin/recent-sales";
import AuthButton from "@/components/admin/AuthButton";
import AddDriver from "@/components/admin/AddDriver";
import DisplayDriver from "@/components/admin/DisplayDriver";
import DisplayVehicle from "@/components/admin/DisplayVehicle";
import AddVehicle from "@/components/admin/AddVehicle";
import DriverInfo from "@/components/employee/EmployeeInfo";

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
        const response = await fetch("http://localhost:3001/driver/");
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
      {/* <div className="md:hidden flex w-full h-screen justify-center items-center text-3xl font-bold">
        <h1>Not Supported</h1>
      </div> */}
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <div className="md:flex hidden">
                <CalendarDateRangePicker />
              </div>
              <AuthButton />
              <ThemeToggle />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="md:flex md:text-xl md:justify-start grid grid-cols-3 md:pb-1 pb-[5.2rem] md:px-1 px-2">
              <TabsTrigger
                className="md:my-0 my-1 mr-1 md:mr-0"
                value="adddrivers"
              >
                Add Drivers
              </TabsTrigger>
              <TabsTrigger className="md:my-0 my-1" value="drivers">
                Drivers
              </TabsTrigger>
              <TabsTrigger
                className="md:my-0 my-1 mr-1 md:mr-0"
                value="addvehicles"
              >
                Add Vehicles
              </TabsTrigger>
              <TabsTrigger
                className="md:my-0 my-1 mr-1 md:mr-0"
                value="vehicles"
              >
                Vehicles
              </TabsTrigger>
              <TabsTrigger className="md:my-0 my-1" value="app">
                Application
              </TabsTrigger>
            </TabsList>

            <TabsContent value="adddrivers" className="space-y-4">
              <AddDriver />
            </TabsContent>
            <TabsContent value="drivers" className="space-y-4">
              <DisplayDriver />
            </TabsContent>
            <TabsContent value="addvehicles" className="space-y-4">
              <AddVehicle />
            </TabsContent>
            <TabsContent value="vehicles" className="space-y-4">
              <DisplayVehicle />
            </TabsContent>
            <TabsContent value="app" className="space-y-4">
              <DriverInfo drivers={drivers} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
