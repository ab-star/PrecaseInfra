
import CompanyVision from "../components/CompanyVision";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import ManagementSection from "../components/ManagementSection";
import AnimatedDivider from "../components/AnimatedDivider";
import KeyManagementSection from "../components/KeyManagementSection";

export default function AboutUsPage() {
  return (
    <>
      <MainHeader />
      <main>
        <CompanyVision />
        <ManagementSection />
        <AnimatedDivider />
        <KeyManagementSection />
      </main>
      <Footer />
    </>
  );
}
