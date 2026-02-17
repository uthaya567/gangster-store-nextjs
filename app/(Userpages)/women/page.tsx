import Curated from "../../components/MainPageComponents/Curated";
import HeroCarousel from "../../components/MainPageComponents/HeroCarousel";
import NewArrivals from "../../components/MainPageComponents/NewArrivals";
import TagData from "../../components/MainPageComponents/TagData";
import CollectionCarousel from "../../components/MainPageComponents/CollectionCarousel";
import Collections from "../../components/MainPageComponents/Collections";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Women's Wear",
    description: "Gangster is a modern streetwear clothing brand offering premium men’s fashion, oversized t-shirts, casual wear, and bold urban styles designed for everyday confidence.",
};
export default function MenDatas() {
  return (
    <>
      <main>
        <section>
          <HeroCarousel/>
        </section>
        <section>
          <CollectionCarousel/>
        </section>
        <section>
          <NewArrivals/>
        </section>
        <section>
          <Collections/>
        </section>
        <section>
          <Curated/>
        </section>
       <section>
          <TagData/>
        </section>
   </main>
    </>
  )
}
