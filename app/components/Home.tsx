import Image from "next/image";
// import MainHeader from "./MainHeader";
import FujiSilvertechLanding from "../pages";
import IndianFlagWithPole from "./IndianFlagWithPole";
import IndiaMapSection from "./IndiaMapSection";
import PresenceSection from "./PresenceSection";
import SustainabilitySectionAnimated from "./SustainabilitySectionAnimated";
import FutureReadyAnimated from "./FutureReadyAnimated";
import SectorsShowcase from "./SectorsShowcase";
import ClientsAcquiredSection from "./ClientsAcquiredSection";
import BottomVideo from "./BottomVideo";
// import Footer from "./Footer";

export default function Home() {
  return (
    <>
      {/* <MainHeader /> */}
      <FujiSilvertechLanding />
      <IndianFlagWithPole />
      <IndiaMapSection />
      <SectorsShowcase />
      <FutureReadyAnimated />
      <ClientsAcquiredSection />
      <SustainabilitySectionAnimated />
      {/* <ConstructionSectorNavigation /> */}
      {/* <FutureReadySection /> */}
      <BottomVideo />
      {/* <Footer /> */}
    </>
  );
}
