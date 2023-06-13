import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { Input } from 'reactstrap';
import SearchBox from 'react-search-box';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav id="navBar">
        <ul>
          <li>
            <img src="" alt="logo" />
          </li>
          <li>
            <Link to="">الرئيسيـــة</Link>
          </li>
          <li>
            <Link to="">الأقســام</Link>
          </li>
          <li>
            <Link to="">المنتجــات</Link>
          </li>
          <li>
            <Link to="">عنّــا</Link>
          </li>
          <li>
            <Link to="">تواصل معنا</Link>
          </li>
        </ul>
        <ul className='left'>
          <li>
          <SearchBox
            placeholder="البحث عن المنتجــات"
            />
          </li>
          <li>
            <Link to="">طلباتـي</Link>
          </li>
          <li>
            <Link to="">
            <FontAwesomeIcon icon={faUser} className='Icons' />
                تسجيل الدخول
            </Link>
          </li>
          <li>
          <Link to="">
            <FontAwesomeIcon icon={faCartShopping} className='Icons' />            
            عربـة التسـوق
            </Link>
          </li>
          </ul>
      </nav>
    )
}

export default NavBar;