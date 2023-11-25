import { GetServerSideProps } from "next";
import axios from "axios";

import mongoose from "mongoose";

import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const DriversPage: React.FC<{ drivers: Driver[] }> = ({ drivers }) => {
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
      await axios.patch(`http://localhost:3001/driver/${objectId}`, {
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
      await axios.patch(`http://localhost:3001/driver/${objectId}`, {
        selected: "1", // Set selected to "1" when selecting
      });
      console.log(`Driver with ID ${driverId} selected successfully`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <h1 className="text-xl pb-5 pt-3 font-semibold">Driver List</h1> */}
      <div className="pt-1 w-full">
        {drivers.map(
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
    <Card className={`w-full dark:text-black ${color}`}>
      <CardHeader>
        <CardTitle>{driver.name}</CardTitle>
        <CardDescription>{driver.interest}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get("http://localhost:3001/driver/");
    const drivers: Driver[] = response.data;
    return { props: { drivers } };
  } catch (error) {
    console.error(error);
    return { props: { drivers: [] } };
  }
};

export default DriversPage;
