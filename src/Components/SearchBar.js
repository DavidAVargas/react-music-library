import { useState, useEffect } from 'react'

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      <form onSubmit={(e) => props.handleSearch(e, searchTerm)}>

        <input type='text' placeholder='Enter a search term here'
          onChange={
            (e) => props.handleSearch(e, e.target.value)}
            // (e) => setSearchTerm(e.target.value)} // Work with the button.
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default SearchBar;