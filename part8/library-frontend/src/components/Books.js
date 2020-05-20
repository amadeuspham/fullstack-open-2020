import React, {useState} from 'react'
import { useQuery } from '@apollo/client';
import _ from 'lodash'

import {ALL_BOOKS} from '../queries'

const GenreButtons = ({books, genres, setBooksByGenres}) => {
  const handleFilterGenre = (genre) => {
    if (genre === 'all') {
      setBooksByGenres(books)
      return
    }
    const filtered = books.filter(book => book.genres.includes(genre))
    setBooksByGenres(filtered)
  }

  return (
    <div>
      {genres.map(genre => 
        <button key={genre} onClick={() => handleFilterGenre(genre)}>{genre}</button>
      )}
      <button key='all' onClick={() => handleFilterGenre('all')}>all genres</button>
    </div>
  )
}

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [booksByGenres, setBooksByGenres] = useState(null)
  if (!props.show) {
    return null
  }

  if (result.loading){
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks
  if (!booksByGenres) {
    setBooksByGenres(allBooks)
    return null
  }

  const genres = _.uniq(_.flatten(allBooks.map(book => [...book.genres])))

  return (
    <div>
      <h2>books</h2>

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
          {booksByGenres.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreButtons books={allBooks} genres={genres} setBooksByGenres={setBooksByGenres}/>
    </div>
  )
}

export default Books