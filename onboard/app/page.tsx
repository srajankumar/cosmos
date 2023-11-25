"use client";
import { useState } from "react";
import Link from "next/link";

const Home = () => {
  const [policyAccepted, setPolicyAccepted] = useState(false);

  const handlePolicyChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setPolicyAccepted(event.target.checked);
  };

  return (
    <main className="policy-container">
      <h2 className="">Company Policy</h2>
      <p>
        This is the company policy. Please read it carefully and click the
        checkbox below to accept.
      </p>
      <input type="checkbox" id="acceptPolicy" onChange={handlePolicyChange} />{" "}
      <label htmlFor="acceptPolicy">I accept the company policy.</label>
      <Link href="/form" passHref>
        <button id="formButton" disabled={!policyAccepted}>
          Go to Form
        </button>
      </Link>
    </main>
  );
};

export default Home;
