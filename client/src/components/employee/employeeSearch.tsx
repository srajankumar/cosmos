import { GetServerSideProps } from "next";
import axios from "axios";
import { useState } from "react";
import mongoose from "mongoose";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DriversPage: React.FC<{ drivers: Driver[] }> = ({ drivers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>(drivers);

  const cardColors = [
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-pink-200",
    "bg-purple-200",
  ];

  const handleDelete = async (driverId: string) => {
    try {
      console.log(`Deleting driver with ID: ${driverId}`);
      // Ensure driverId is a valid ObjectId before sending the request
      const objectId = new mongoose.Types.ObjectId(driverId);
      await axios.patch(`${serverUrl}/driver/${objectId}`, {
        selected: "0", // Set selected to "0" when deleting
      });
      console.log(`Driver with ID ${driverId} deleted successfully`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = async (driverId: string) => {
    try {
      console.log(`Selecting driver with ID: ${driverId}`);
      // Ensure driverId is a valid ObjectId before sending the request
      const objectId = new mongoose.Types.ObjectId(driverId);
      await axios.patch(`${serverUrl}/driver/${objectId}`, {
        selected: "1", // Set selected to "1" when selecting
      });
      console.log(`Driver with ID ${driverId} selected successfully`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredDrivers = drivers.filter((driver) =>
      driver.name.toLowerCase().includes(searchTerm)
    );
    setFilteredDrivers(filteredDrivers);
  };

  return (
    <div className="w-full mt-1">
      <div className="mb-4">
        <Input
          value={searchTerm}
          onChange={handleSearch}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="pt-1 space-y-4 w-full">
        {filteredDrivers.map(
          (driver, index) =>
            driver.selected === "-1" && (
              <DriverCard
                key={driver._id}
                driver={driver}
                color={cardColors[index % cardColors.length]}
                onDelete={() => handleDelete(driver._id)}
                onSelect={() => handleSelect(driver._id)}
              />
            )
        )}
      </div>
    </div>
  );
};

interface Driver {
  _id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  qualification: string;
  interest: string;
  country: string;
  website: string;
  selected: string;
}

interface DriverCardProps {
  driver: Driver;
  color: string;
  onDelete: () => void;
  onSelect: () => void;
}

const DriverCard: React.FC<DriverCardProps> = ({
  driver,
  color,
  onDelete,
  onSelect,
}) => {
  return (
    <Card className={`w-full dark:text-black`}>
      <CardHeader>
        <CardTitle className="text-xl dark:text-white">{driver.name}</CardTitle>
        <CardDescription className="flex justify-between">
          <div>{driver.interest}</div>
          <div>{driver.experience}</div>
        </CardDescription>
      </CardHeader>
      <div className={`w-full h-1 dark:text-black ${color}`}></div>
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(`${serverUrl}/driver/`);
    const drivers: Driver[] = response.data;
    return { props: { drivers } };
  } catch (error) {
    console.error(error);
    return { props: { drivers: [] } };
  }
};

export default DriversPage;
