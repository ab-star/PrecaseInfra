import CompanyVision from "../components/CompanyVision";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";

export default function AboutUsPage() {
  return (
    <>
      <MainHeader />
      <main className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
        <CompanyVision />
      </main>
      <Footer />
    </>
  );
}
