import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "Antivirus" },
    
  ];
};

export default function Index() {
  return (
    <div className="font-sans bg-gray-100">
      <Navbar></Navbar>
    </div>
    )}
