import './search-bar.scss'

interface SearchBarProps {
    searchQuery: (text: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
    return (<form className={'search-box'} onSubmit={(e) => {
        e.preventDefault()
        // @ts-ignore
        const searchText = document.getElementById('search').value;
        props.searchQuery(searchText || '')
    }}>
        <input type="text" id="search" data-testid="search" name="searchbox" placeholder={' '}/>
        <button type="reset"></button>
    </form>)
}
