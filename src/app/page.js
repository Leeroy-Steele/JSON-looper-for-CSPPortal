"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [obj, setObj] = useState({ productMappings: [{ productName: "1" }] });
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let productMappings = obj.productMappings;
    const counts = {};

    // Loop through each element in the array
    productMappings.forEach((value) => {
      // If the value is encountered for the first time, set the count to 1
      if (!counts[value.productName]) {
        counts[value.productName] = 1;
      } else {
        counts[value.productName]++;
      }
    });

    console.log(Object.entries(counts));
    setResult(Object.entries(counts));
    setShowResults(true);
  };

  return (
    <main className="flex flex-col items-center p-24">
      <h2 className={`mb-3 text-2xl font-semibold`}>JSON Looper</h2>
      <h2 className={`mb-3 text-xl font-semibold`}>Instructions</h2>
      <ol className="mb-8 max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
        <li>Login to CSP portal - https://www.cspportal.cloud/</li>
        <li>Impersonate MSP that can't save product profile page</li>
        <li>Press F12</li>
        <li>Navigate to Products Page</li>
        <li>(In Dev Tools) Go to network {">"} billing-profile</li>
        <li>(In Dev Tools) Copy the whole billing-profile JSON</li>
        <li>Paste the JSON below</li>
      </ol>
      <form className="mb-6 flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Input JSON from billing-profile
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 min-w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="{'id': 63,'productMappings:[]'}"
          onChange={(e) => setObj(JSON.parse(e.target.value))}
        ></textarea>
        <button
          className="mt-2 shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Show Duplicates
        </button>
      </form>
      <table className="w-[64rem] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Count
            </th>
          </tr>

          {/* Show duplicates first */}
          {showResults &&
            result.map((r) => 
              {return r[1]>1&&
                (<tr
                key={r[0]}
                className="bg-yellow-100 border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{r[0]}</td><td className="px-6 py-4">{r[1]}</td>
              </tr>)  
              })}

          {/* Show the rest */}
          {showResults &&
            result.map((r) => 
              {return r[1]===1&&
                (<tr
                key={r[0]}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{r[0]}</td><td className="px-6 py-4">{r[1]}</td>
              </tr>)  
              })}

        </thead>
      </table>
    </main>
  );
}
