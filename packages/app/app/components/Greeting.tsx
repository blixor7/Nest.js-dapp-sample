"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useGreeting } from "../hooks/useGreeting";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";

const Greeting = () => {
  const [newGreeting, setNewGreeting] = useState<string>("");
  const newGreetingInputRef = useRef<HTMLInputElement>(null);

  const { openConnectModal } = useConnectModal();

  // 🔹 Success handler wrapped in useCallback to avoid re-renders
  const onSetGreetingSuccess = useCallback(() => {
    toast.success("✅ Successfully set your new greeting", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      className: "text-sm",
    });
    setNewGreeting("");
    newGreetingInputRef.current?.blur();
  }, []);

  const {
    address,
    greeting,
    getGreetingLoading,
    getGreetingError,
    setGreeting,
    setGreetingLoading,
    prepareSetGreetingError,
    setGreetingError,
  } = useGreeting({ newGreeting, onSetGreetingSuccess });

  useEffect(() => {
    if (!address) {
      setNewGreeting("");
    }
  }, [address]);

  // 🔹 Render helpers
  const renderGreeting = () => {
    if (getGreetingLoading) {
      return (
        <p className="text-lg text-center text-gray-500 italic">Loading...</p>
      );
    }

    if (getGreetingError) {
      return (
        <p className="text-lg text-center text-red-500">
          There was an error getting the greeting
        </p>
      );
    }

    return <p className="text-lg text-center">{greeting}</p>;
  };

  const renderButtonContent = () =>
    setGreetingLoading ? "Setting greeting..." : "Set your new greeting";

  return (
    <div className="space-y-8">
      {/* Greeting Display */}
      <div className="flex flex-col space-y-4">
        <p className="text-sm text-gray-500 text-center">
          Greeting from the blockchain:
        </p>
        {renderGreeting()}
      </div>

      {/* Greeting Input + Actions */}
      <div className="space-y-8">
        <div className="flex flex-col space-y-4">
          <input
            className="border p-4 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setNewGreeting(e.target.value)}
            placeholder="Write a new greeting"
            ref={newGreetingInputRef}
            disabled={!address}
            value={newGreeting}
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-8 rounded-md transition-all"
            onClick={setGreeting}
            disabled={
              !address || !newGreeting || setGreetingLoading || prepareSetGreetingError
            }
          >
            {renderButtonContent()}
          </button>

          {/* Wallet connection / input hints */}
          {!address ? (
            <button
              className="text-sm text-gray-500 text-center underline hover:opacity-80"
              onClick={openConnectModal}
            >
              Connect your wallet to set a new greeting
            </button>
          ) : (
            !newGreeting && (
              <p className="text-sm text-gray-500 text-center">
                Type something to set a new greeting
              </p>
            )
          )}

          {/* Error Messages */}
          {setGreetingError && (
            <p className="text-sm text-red-500 text-center">
              There was an error setting your new greeting
            </p>
          )}
          {newGreeting && prepareSetGreetingError && (
            <p className="text-sm text-red-500 text-center">
              Sorry, only the contract owner can set a greeting
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export { Greeting };
