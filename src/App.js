import { useEffect, useState, useRef, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import SearchBar from './Components/SearchBar'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView'
import { SearchContext } from './Context/SearchContext'

function App() {
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState('Search for Music!')
    const [data, setData] = useState([])
    let searchInput = useRef('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                document.title = `${search} Music`
                const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(search)}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const resData = await response.json()
                if (resData.results.length > 0) {
                    setData(resData.results)
                } else {
                    setMessage('Not Found')
                }
            } catch (error) {
                console.error("Fetch error: ", error)
                setMessage('Failed to fetch data')
            }
        }
        if (search) {
            fetchData()
        }
    }, [search])

    const handleSearch = (e, term) => {
        e.preventDefault()
        setSearch(term)
    }

    return (
        <div style={{ 'display': 'flex', 'flexFlow': 'column', 'justifyContent': 'center', 'alignItems': 'center' }}>
            {message}
            <Router>
                <Routes>
                    <Route path='/' element={
                        <Fragment>
                            <SearchContext.Provider value={{
                                term: searchInput,
                                handleSearch: handleSearch
                            }}></SearchContext.Provider>
                            <SearchBar handleSearch={handleSearch} />
                            <Gallery data={data} />
                        </Fragment>
                    } />
                    <Route path="/album/:id" element={<AlbumView />} />
                    <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
