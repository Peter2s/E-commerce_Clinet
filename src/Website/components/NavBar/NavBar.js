import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { Link } from 'react-router-dom';
import SearchBox from 'Website/SharedUI/SearchBox/SearchBox';
import { useEffect, useState } from 'react';
import { axiosInstance } from './../../../Axios';

const NavBar = () => {
  const [navbarData, setNavbarData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/info")
      .then((response) => {
        setNavbarData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    return (
        <nav id="navBar">
          <Link to="/home">
            <img src={navbarData.logo} className='logoNav' alt="logo" />
          </Link>
        <ul>
          <li>
            <Link to="/home">الرئيسيـــة</Link>
          </li>
          <li>
            <Link to="/categories">الأقســام
            </Link>
          </li>
          <li>
            <Link to="/products">المنتجــات</Link>
          </li>
          <li>
            <Link to="/aboutus">عنّــا</Link>
          </li>
          <li>
            <Link to="/contactus">تواصل معنا</Link>
          </li>
        </ul>
        <li>
          <SearchBox placeholder="البحث عن المنتجــات..." />
          </li>
          <li>
            <Link to="/orders">طلباتـي</Link>
          </li>
          <li>
            <Link to="/auth/login">
            <FontAwesomeIcon icon={faUser} className='Icons' />
                تسجيل الدخول
            </Link>
          </li>
          <li>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} className='Icons cartIcon' />            
            عربـة التسـوق
            </Link>
          </li>
      </nav>
    )
}

export default NavBar;