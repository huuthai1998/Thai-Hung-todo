import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div className="w-full py-6 text-center">
        <div className="text-6xl font-semibold mt-16">
          Welcome to <span className="text-red">Todap</span>
        </div>
        <div className="text-6xl font-semibold mt-4">
          Let's manage your todo list
        </div>
        <div className="text-lg font-medium mt-6">
          This is an assigment from week 5 & 6 of Code Academy 2022
        </div>
        <button
            onClick={() => navigate("/signup")}
            className="font-semibold text-xl border-b border-red rounded-md py-2 px-8 mt-7 bg-red text-white"
          >
          Get Started
        </button>
      </div>
    </div>
  );
}
