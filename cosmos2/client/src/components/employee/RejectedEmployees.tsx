// import { GetServerSideProps } from "next";
// import axios from "axios";

// import React, { useState } from "react";
// import emailjs from "emailjs-com";

// import mongoose from "mongoose";

// import { Button } from "@/components/ui/button";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const emailServiceId = "service_hb85bsn";
// const emailAcceptedTemplateId = "template_accepted"; // Replace with the actual template ID
// const emailRejectedTemplateId = "template_rejected"; // Replace with the actual template ID
// const emailApiKey = "iFmwuuVpkKm_1S_rn";

// const RejectedEmployees: React.FC<{ drivers: Driver[] }> = ({ drivers }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");

//   const cardColors = [
//     "bg-blue-200",
//     "bg-green-200",
//     "bg-yellow-200",
//     "bg-pink-200",
//     "bg-purple-200",
//   ];

//   const handleDelete = async (driverId: string) => {
//     try {
//       console.log(`Deleting driver with ID: ${driverId}`);
//       // Ensure driverId is a valid ObjectId before sending the request
//       const objectId = new mongoose.Types.ObjectId(driverId);
//       await axios.patch(`http://localhost:3001/driver/${objectId}`, {
//         selected: "0", // Set selected to "0" when deleting
//       });
//       // const templateParams = {
//       //   from_name: "Your Name", // Set the sender's name
//       //   reply_to: "your-email@example.com", // Set the sender's email
//       //   to_name: driver.name,
//       //   subject: "Application Rejected",
//       //   message: `Dear ${driver.name},\n\nWe regret to inform you that your application has been rejected.\n\nSincerely,\nThe Team`,
//       // };

//       // await emailjs.send(
//       //   emailServiceId,
//       //   emailRejectedTemplateId,
//       //   templateParams,
//       //   emailApiKey
//       // );

//       console.log(`Driver with ID ${driverId} rejected successfully`);
//       window.location.reload();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSelect = async (driverId: string) => {
//     try {
//       console.log(`Selecting driver with ID: ${driverId}`);
//       // Ensure driverId is a valid ObjectId before sending the request
//       const objectId = new mongoose.Types.ObjectId(driverId);
//       await axios.patch(`http://localhost:3001/driver/${objectId}`, {
//         selected: "1", // Set selected to "1" when selecting
//       });
//       console.log(`Driver with ID ${driverId} selected successfully`);
//       window.location.reload();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-xl pb-5 pt-3 font-semibold">Driver List</h1>
//       <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
//         {drivers.map(
//           (driver, index) =>
//             driver.selected === "0" && (
//               <DriverCard
//                 key={driver._id}
//                 driver={driver}
//                 color={cardColors[index % cardColors.length]}
//                 onDelete={() => handleDelete(driver._id)}
//                 onSelect={() => handleSelect(driver._id)}
//               />
//             )
//         )}
//       </div>
//     </div>
//   );
// };

// interface Driver {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   experience: string;
//   qualification: string;
//   interest: string;
//   country: string;
//   website: string;
//   selected: string;
// }

// interface DriverCardProps {
//   driver: Driver;
//   color: string;
//   onDelete: () => void;
//   onSelect: () => void;
// }

// const DriverCard: React.FC<DriverCardProps> = ({
//   driver,
//   color,
//   onDelete,
//   onSelect,
// }) => {
//   return (
//     <Card className={`w-full dark:text-black ${color}`}>
//       <CardHeader>
//         <CardTitle>{driver.name}</CardTitle>
//         <CardDescription>{driver.interest}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Accordion type="single" collapsible className="w-full">
//           <AccordionItem value="item-1">
//             <AccordionTrigger>{driver.experience} Years</AccordionTrigger>
//             <AccordionContent>
//               <div className="flex flex-col space-y-1.5 tracking-wide">
//                 Email: {driver.email}
//               </div>
//               <div className="flex flex-col space-y-1.5 tracking-wide">
//                 Phone: {driver.phone}
//               </div>
//               <div className="flex flex-col space-y-1.5 tracking-wide">
//                 Qualification: {driver.qualification}
//               </div>
//               <div className="flex flex-col space-y-1.5 tracking-wide">
//                 Country: {driver.country}
//               </div>
//               <div className="flex flex-col space-y-1.5 tracking-wide">
//                 Website: {driver.website}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button onClick={onSelect}>Chenge of mind?</Button>
//         {/* <Button variant="destructive" onClick={onDelete}>
//           Delete
//         </Button> */}
//       </CardFooter>
//     </Card>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const response = await axios.get("http://localhost:3001/driver/");
//     const drivers: Driver[] = response.data;
//     return { props: { drivers } };
//   } catch (error) {
//     console.error(error);
//     return { props: { drivers: [] } };
//   }
// };

// export default RejectedEmployees;

import { GetServerSideProps } from "next";
import axios from "axios";
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
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

const emailServiceId = "service_hb85bsn";
const emailAcceptedTemplateId = "template_bmwqnf5"; // Replace with the actual template ID
const emailRejectedTemplateId = "template_rejected"; // Replace with the actual template ID
const emailApiKey = "iFmwuuVpkKm_1S_rn";

const RejectedEmployees: React.FC<{ drivers: Driver[] }> = ({ drivers }) => {
  const [driversList, setDriversList] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/driver/");
        const data: Driver[] = response.data;
        setDriversList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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

      console.log(`Driver with ID ${driverId} rejected successfully`);
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

      // Send acceptance email
      const selectedDriver = driversList.find(
        (driver) => driver._id === driverId
      );

      const templateParams = {
        cosmos: "Cosmos",
        title: `${selectedDriver?.interest}`,
        link: "http://localhost:3000/employee/login",
        subject: "Application Accepted",
        name: `${selectedDriver?.name}`,
      };

      await emailjs.send(
        emailServiceId,
        emailAcceptedTemplateId,
        templateParams,
        emailApiKey
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <h1 className="text-xl pb-5 pt-3 font-semibold">Driver List</h1> */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {driversList.map(
          (driver, index) =>
            driver.selected === "0" && (
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
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{driver.experience} Years</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-1.5 tracking-wide">
                Email: {driver.email}
              </div>
              <div className="flex flex-col space-y-1.5 tracking-wide">
                Phone: {driver.phone}
              </div>
              <div className="flex flex-col space-y-1.5 tracking-wide">
                Qualification: {driver.qualification}
              </div>
              <div className="flex flex-col space-y-1.5 tracking-wide">
                Country: {driver.country}
              </div>
              <div className="flex flex-col space-y-1.5 tracking-wide">
                Website: {driver.website}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onSelect}>Change of mind?</Button>
        {/* <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button> */}
      </CardFooter>
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

export default RejectedEmployees;
