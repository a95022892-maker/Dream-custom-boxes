import { Blog } from "./_components/Blog";
import { Faq } from "./_components/Faq";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Industries } from "./_components/Industries";
import { Process } from "./_components/Process";
import { QuoteForm } from "./_components/QuoteForm";
import { Reviews } from "./_components/Reviews";
import { SampleEco } from "./_components/SampleEco";
import { StandOut } from "./_components/StandOut";
import { TopSellers } from "./_components/TopSellers";
import { WhyChoose } from "./_components/WhyChoose";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TopSellers />
        <Process />
        <Industries />
        <WhyChoose />
        <QuoteForm />
        <SampleEco />
        <StandOut />
        <Reviews />
        <Faq />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
