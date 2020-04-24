import React, {useState} from 'react';
import CountryDetails from './CountryDetails';

const CountryBar = ({country}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <p>{country.name}</p>
      <button type="button" onClick={() => setShowDetails(!showDetails)}> 
        {showDetails ? 'hide' : 'show'}
      </button>
      {showDetails 
        ? <CountryDetails country={country}/>
        : null
      }
    </div>
  );
}

export default CountryBar;