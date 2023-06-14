import Silder from "../../components/Home/Silder";
import { HomeCategories } from "../../components/Home/HomeCategories";
import { LatestProduct } from "../../components/Home/LatestProduct";
import { Features } from "../../components/Home/Features";

const Home = () => {
  return (
    <div id="home">
      <Silder />
      <Features />
      <HomeCategories />
      <LatestProduct
        title="احدث المنتجات"
        btntitle="المزيد"
        pathText="/products"
      />
    </div>
  );
};

export default Home;
