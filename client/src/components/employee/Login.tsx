"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { useCookies } from "react-cookie";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function DriverLogin() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [, setCookies] = useCookies(["access_token", "username"]);

  const startTimer = () => {
    // Get the current timestamp and store it in localStorage
    const startTime = Date.now();
    window.localStorage.setItem("timerStartTime", startTime.toString());
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setCookies("username", username);
    console.log("API request sent!");
    try {
      const response = await axios.post(`${serverUrl}/Driver/login`, {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      startTimer();

      window.location.href = "/employee/dashboard";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid w-96 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Chiara Rossi"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid gap-3 w-full">
            <Button className="w-full" type="submit">
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
