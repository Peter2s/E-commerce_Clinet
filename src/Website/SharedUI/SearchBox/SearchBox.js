import ReactSearchField from 'react-search-field';
import './SearchBox.css';

const SearchBox = ({placeholder, onChange, onEnter, className}) => {
    return (
        <ReactSearchField
          placeholder={placeholder}
          onChange={onChange}
          onEnter={onEnter}
          classNames="search-box"
        />
    );
  }

  export default SearchBox;