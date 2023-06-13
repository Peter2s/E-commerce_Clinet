import FooterSite from "../../components/Footer/FooterSite";
import NavBar from "../../components/NavBar/NavBar";
import Silder from "../../components/Home/Silder";

const Home = () => {
  return (
    <div id="home" dir="rtl">
      <NavBar />
      <Silder />
      <FooterSite />
    </div>
  );
};

export default Home;
