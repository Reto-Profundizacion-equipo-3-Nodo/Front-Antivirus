import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Home from "~/components/Home";
import HomeOpportunities from "~/components/HomeOpportunities";
import HomeServices from "~/components/HomeServices";

export const meta: MetaFunction = () => {
  return [{ title: "Antivirus" }];
};

export default function Index() {
  return (
    <div className="font-sans bg-gray-100">
      <Navbar />
      <Home />
      <HomeOpportunities />
      <HomeServices />
    </div>
  );
}
