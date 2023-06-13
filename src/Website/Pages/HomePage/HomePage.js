import FooterSite from "../../components/Footer/FooterSite";
import NavBar from "../../components/NavBar/NavBar";
import Silder from "../../components/Home/Silder";
import { HomeCategories } from "../../components/Home/HomeCategories";

const Home = () => {
  return (
    <div id="home" dir="rtl">
      <NavBar />
      <Silder />
      <HomeCategories />
      <FooterSite />
    </div>
  );
};

export default Home;
