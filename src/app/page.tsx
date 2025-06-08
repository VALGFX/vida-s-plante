import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductItem from "@/components/ProductItem";
import Latest from "@/components/Latest";
import BestSeller from "@/components/Bestseller";

export default function Home() {
  return (
      <>
        <Navbar />
        <main>
          <Hero/>
            <Latest/>
            <BestSeller/>
        </main>
      </>
  )
}
