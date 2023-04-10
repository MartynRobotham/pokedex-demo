interface SearchBarProps {
    searchQuery: (text: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
    return (<form onSubmit={(e) => {
        e.preventDefault()
        // @ts-ignore
        const searchText = document.getElementById('search').value;
        props.searchQuery(searchText || '')
    }}>
        <label>Search:</label>
        <input type="text" id="search" name="searchbox" placeholder="Search..."/>
        <button type="submit">Go</button>
    </form>)
}
