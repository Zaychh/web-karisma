import React from "react";
import MyProgram from "./MyProgram";
import MyProgramPurchased from "./MyProgramPurchased";

// Simulasi status pembelian
const isPurchased = true; // Ganti nanti dengan data dari API atau localStorage

const DashboardRouter = () => {
  return isPurchased ? <MyProgramPurchased /> : <MyProgram />;
};

export default DashboardRouter;
