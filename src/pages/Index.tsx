import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Homesteads from "@/components/landing/Homesteads";
import UseCases from "@/components/landing/UseCases";
import Process from "@/components/landing/Process";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <Homesteads />
        <UseCases />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
