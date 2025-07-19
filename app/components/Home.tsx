import Image from "next/image";
import MainHeader from "./MainHeader";
import FujiSilvertechLanding from "../pages";
import IndianFlagWithPole from "./IndianFlagWithPole";
import PresenceSection from "./PresenceSection";
import SustainabilitySectionAnimated from "./SustainabilitySectionAnimated";
import FutureReadyAnimated from "./FutureReadyAnimated";
import SectorsShowcase from "./SectorsShowcase";
import ClientsAcquiredSection from "./ClientsAcquiredSection";
import BottomVideo from "./BottomVideo";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
            <MainHeader />
      <FujiSilvertechLanding />
      <IndianFlagWithPole />
      <PresenceSection />
      <SustainabilitySectionAnimated />
      {/* <ConstructionSectorNavigation /> */}
      {/* <FutureReadySection /> */}
      <FutureReadyAnimated />
      <SectorsShowcase />
      <ClientsAcquiredSection />
      <BottomVideo />
      <Footer />
    </>
  );
}
