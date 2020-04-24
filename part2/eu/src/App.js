import React, {useState, useEffect} from 'react';
import axios from 'axios';

import CountryDetails from './CountryDetails';
import CountryBar from './CountryBar';

const SearchBar = ({searchStatus, setSearchStatus, filterData}) => {
  const handleSearchChange = (event) => {
    const input = event.target.value;
    if (input === '') {
      setSearchStatus({searching: false, searchInput: ''})
    } else {
      setSearchStatus({searching: true, searchInput: input})
      filterData(input)
    }
  }

  return (
    <div>
      <p>Find countries </p>
      <input value={searchStatus.searchInput} onChange={handleSearchChange}/>
    </div>
  )
}

function App() {
  const [data, setData] = useState([]);
  const [searchStatus, setSearchStatus] = useState({
    searching: false,
    searchInput: "",
  })
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setData(response.data))
  }, [])

  const filterData = (searchInput) => {
    const filtered = data.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase()))
    setFilteredCountries(filtered);
  }

  if (searchStatus.searching) {
    if (filteredCountries.length > 10) {
      return (
        <div>
          <SearchBar searchStatus={searchStatus} setSearchStatus={setSearchStatus} filterData={filterData}/>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    } else if (filteredCountries.length > 1) {
      return (
        <div>
          <SearchBar searchStatus={searchStatus} setSearchStatus={setSearchStatus} filterData={filterData}/>
          {filteredCountries.map(country => {
            return <CountryBar key={country.name} country={country}/>
          })}
        </div>
      )
    } else if (filteredCountries.length === 1) {
      return (
        <div>
          <SearchBar searchStatus={searchStatus} setSearchStatus={setSearchStatus} filterData={filterData}/>
          <CountryDetails country={filteredCountries[0]}/>
        </div>
      )
    } else {
      return (
        <div>
        <SearchBar searchStatus={searchStatus} setSearchStatus={setSearchStatus} filterData={filterData}/>
        <p>No match</p>
        </div>
      )  
    }
  } else {
    return (
      <SearchBar searchStatus={searchStatus} setSearchStatus={setSearchStatus} filterData={filterData}/>
    )  
  }
}

export default App;
