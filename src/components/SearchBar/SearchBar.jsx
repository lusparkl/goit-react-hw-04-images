import { SearchBarWrap, SearchForm, SearchInput, SerachFormButton } from './SearchBar.styled'
import { AiOutlineSearch } from "react-icons/ai";

export const SearchBar = ({onSubmit}) => {
  return (
    <SearchBarWrap>
      <SearchForm onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target.searchInput.value);
      }}>
        <SearchInput placeholder='Find images' type='text' required name='searchInput' />
        <SerachFormButton>
          <AiOutlineSearch size={40} />
        </SerachFormButton>
      </SearchForm>
    </SearchBarWrap>
  )
}
