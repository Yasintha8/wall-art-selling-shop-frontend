import CategorySection from "../../components/categorySection";
import HeroCarousel from "../../components/heroCarousel";
import TrendingProducts from "../../components/trendingProducts";


export default function Home() {
 
    return (
        <div>
          <HeroCarousel />
          <CategorySection />
          <TrendingProducts />
        </div>
    )
}
