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
    <div className="policy-container min-h-screen justify-center flex flex-col">
      <h2 className="text-3xl font-bold">Company Name</h2>
      <div className="space-y-3 py-5">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          mollitia minima. Debitis excepturi blanditiis, eius error
          reprehenderit quas aliquid omnis maiores nam iure quos. Quo deserunt
          itaque consequatur eveniet vel ullam enim!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          mollitia minima. Debitis excepturi blanditiis, eius error
          reprehenderit quas aliquid omnis maiores nam iure quos. Quo deserunt
          itaque consequatur eveniet vel ullam enim!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
          fugiat tenetur sunt nobis aspernatur eveniet saepe quo excepturi,
          quisquam culpa harum laudantium maiores molestiae quod mollitia quis
          incidunt nisi, et tempore aperiam molestias sapiente blanditiis
          cumque! Commodi ipsum nemo similique cupiditate, delectus soluta,
          iusto, quod impedit repellat aliquam explicabo? Nisi, esse odio ab,
          minima distinctio doloremque recusandae repudiandae placeat, beatae
          consectetur sunt ratione. Ratione.
        </p>
        <div className="flex items-center">
          <label htmlFor="acceptPolicy">
            <span className="text-red-500">* </span>I accept the company policy
          </label>
          <input
            type="checkbox"
            id="acceptPolicy"
            className="form-checkbox h-5 w-5 ml-2"
            onChange={handlePolicyChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <Link href="/form" className="w-fit" passHref>
          <button
            className={`rounded-lg px-5 py-1 ${
              policyAccepted
                ? "bg-green-500 hover:bg-green-700 transition-colors"
                : "bg-green-900"
            }`}
            id="formButton"
            disabled={!policyAccepted}
          >
            Go to Form
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
