import Carousel from "../components/Carousel";
import ProductFeed from "../components/ProductFeed";

const HomePage = ({ latestProducts, mostDemandedProducts, offersProducts }) => {
  return (
    <div className="App">
      <Carousel />
      <ProductFeed products={latestProducts} title="Latest Products" />
      <ProductFeed
        products={mostDemandedProducts}            
        title="Most Demanded Products" 
      />
      <ProductFeed products={offersProducts} title="Offers" />
    </div>
  );
};

export default HomePage;
