"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { Github } from "lucide-react";
import Form from "@/components/Onboard/Form";
import { Checkbox } from "@/components/ui/checkbox";

const page = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };
  console.log(termsAccepted);
  return (
    <div>
      <div className="flex items-center md:py-40 py-20 flex-col min-h-screen">
        <div className="max-w-4xl px-5 space-y-5">
          <div className="space-y-3">
            <h4 className="text-3xl font-bold tracking-wide leading-none">
              Cosmos
            </h4>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              repellat aliquam facilis tenetur impedit sed, adipisci autem est
              alias vel eligendi at voluptatum nemo neque voluptatem ad
              dignissimos, reprehenderit natus odit, aperiam eos a. Non
              explicabo quo nemo delectus numquam illum architecto dolor earum
              doloremque ducimus! Nemo nisi nobis atque magni consectetur unde,
              impedit, ex corporis blanditiis a, ducimus officia nihil error sit
              tempore!
            </p>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              maxime ea hic numquam quas laboriosam delectus unde iste molestiae
              similique necessitatibus consequatur, tempora a repellat
              consequuntur voluptates dignissimos earum accusamus.
            </p>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              repellat aliquam facilis tenetur impedit sed, adipisci autem est
              alias vel eligendi at voluptatum nemo neque voluptatem ad
              dignissimos, reprehenderit natus odit, aperiam eos a. Non
              explicabo quo nemo delectus numquam illum architecto dolor earum
              doloremque ducimus! Nemo nisi nobis atque magni consectetur unde,
              impedit, ex corporis blanditiis a, ducimus officia nihil error sit
              tempore!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onCheckedChange={handleTermsChange} />
            <label
              htmlFor="terms"
              className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          {termsAccepted && <Form />}
        </div>
        <div className="fixed top-5 left-5">
          <ModeToggle />
        </div>
        <div className="fixed top-5 right-5">
          <Link href="/admin/login">
            <Button className="w-32" variant="outline">
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
