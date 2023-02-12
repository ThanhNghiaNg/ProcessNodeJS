import "./SearchBody.css";
import Container from "../UI/Container";
import SearchPopup from "./SearchPopup";
import SearchList from "./SearchList";

const SearchBody = (props) => {
  return (
    <Container className="search-body">
      <SearchPopup />
      <SearchList />
    </Container>
  );
};

export default SearchBody;
