import React, {useState, useEffect} from 'react'
import { useLazyQuery } from '@apollo/client';

import {ALL_BOOKS, ME} from '../queries'

const Recommended = (props) => {
  const [findRecommendations, booksResult] = useLazyQuery(ALL_BOOKS) 
  const [getUserGenre, meResult] = useLazyQuery(ME)

  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    if (meResult.data && booksResult.data) {
      setRecommendations(booksResult.data.allBooks)
    } else if (meResult.data && !booksResult.data) {
      findRecommendations({variables: {genre: meResult.data.me.favoriteGenre}})
    } else {
      getUserGenre()
    }
  }, [meResult.data, booksResult.data])// eslint-disable-line 

  if (!props.show) {
    return null
  }

  if (meResult.loading || booksResult.loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in a favorite genre <b>{meResult.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {recommendations.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended