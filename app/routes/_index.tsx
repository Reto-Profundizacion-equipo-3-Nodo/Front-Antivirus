import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Home from "~/components/Home";
import HomeOpportunities from "~/components/HomeOpportunities";
import HomeServices from "~/components/HomeServices";
import '~/tailwind.css';

export const meta: MetaFunction = () => {
  return [{ title: "Antivirus" }];
};

export default function Index() {
  return (
    <div className="font-sans bg-gray-100">
      <Home />
      <HomeOpportunities />
      <HomeServices />
    </div>
  );
}
