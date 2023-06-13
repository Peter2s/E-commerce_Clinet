import FooterSite from "../../components/Footer/FooterSite";
import NavBar from "../../components/NavBar/NavBar";
import Silder from "../../components/Home/Silder";
import { HomeCategories } from "../../components/Home/HomeCategories";
import { LatestProduct } from "../../components/Home/LatestProduct";

const Home = () => {
  return (
    <div id="home" dir="rtl">
      <NavBar />
      <Silder />
      <HomeCategories />
      <LatestProduct
        title="احدث المنتجات"
        btntitle="المزيد"
        pathText="/products"
      />
      <FooterSite />
    </div>
  );
};

export default Home;
