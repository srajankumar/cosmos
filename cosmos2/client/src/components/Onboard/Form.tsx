"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function DriverRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [interest, setInterest] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      await axios.post(`${serverUrl}/driver/register`, {
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

      // Clear the form inputs
      setName("");
      setEmail("");
      setPhone("");
      setExperience("");
      setQualification("");
      setInterest("");
      setCountry("");
      setWebsite("");
      //   window.location.href = "/driver/login";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="pt-10">
        <div className="grid w-full gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Full Name</Label>
            <Input
              required
              id="name"
              type="text"
              placeholder="Chiara Rossi"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            {/* add dropdown */}
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              placeholder="chiara.rossi@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              required
              id="phone"
              type="number"
              placeholder="9998887777"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            {/* add dropdown */}
            <Label htmlFor="experience">Experience</Label>
            <Input
              required
              id="experience"
              type="text"
              placeholder="1 year"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="qualification">Highest Qualification</Label>
            <Input
              required
              id="qualification"
              type="text"
              placeholder="BE/B.TECH"
              value={qualification}
              onChange={(event) => setQualification(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interest">Area of Interest</Label>
            <Input
              required
              id="interest"
              type="text"
              placeholder="Web Development"
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country of Origin</Label>
            <Input
              required
              id="country"
              type="text"
              placeholder="your-country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              required
              id="website"
              type="text"
              placeholder="srajan.vercel.app"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="grid gap-3 mt-5 w-full">
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
