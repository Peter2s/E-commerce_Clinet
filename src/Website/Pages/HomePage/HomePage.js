import Silder from "../../components/Home/Silder";
import { HomeCategories } from "../../components/Home/HomeCategories";
import { LatestProduct } from "../../components/Home/LatestProduct";

const Home = () => {
  return (
    <div id="home">
      <Silder />
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
