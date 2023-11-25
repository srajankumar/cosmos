// pages/drivers.tsx

import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";

const DriversPage: React.FC<{ drivers: Driver[] }> = ({ drivers }) => {
  return (
    <div>
      <h1>Driver List</h1>
      <div className="grid grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <DriverCard key={driver._id} driver={driver} />
        ))}
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
}

const DriverCard: React.FC<{ driver: Driver }> = ({ driver }) => {
  return (
    <div className="bg-white p-4 shadow-md">
      <h2>{driver.name}</h2>
      <p>Email: {driver.email}</p>
      <p>Phone: {driver.phone}</p>
      <p>Experience: {driver.experience}</p>
      {/* Add other fields as needed */}
    </div>
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
