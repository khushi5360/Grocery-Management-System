import HeroBanner from '../components/home/HeroBanner'
import WhyChooseUs from '../components/home/WhyChooseUs'
import CategorySection from '../components/home/CategorySection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import OffersSection from '../components/home/OffersSection'
import BestSellers from '../components/home/BestSellers'


export default function Home() {
  return (
    <div>
      <HeroBanner />
      <WhyChooseUs />
      <CategorySection />
      <FeaturedProducts />
      <OffersSection />
      <BestSellers />
    </div>
  )
}