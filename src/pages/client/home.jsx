import CategorySection from "../../components/categorySection";
import CustomArt from "../../components/customArt";
import HeroCarousel from "../../components/heroCarousel";
import NewArrivals from "../../components/newArrivals";
import TrendingProducts from "../../components/trendingProducts";
import TrustSection from "../../components/trustSection";


export default function Home() {
 
    return (
        <div>
          <HeroCarousel />
          <CategorySection />
          <TrendingProducts />
          <NewArrivals />
          <CustomArt />
          <TrustSection />
        </div>
    )
}
