import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import { useQuery, useMutation } from '@apollo/client';

import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

const BirthdayForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [result.data])// eslint-disable-line 

  const submit = (event) => {
    event.preventDefault()

    editAuthor({variables: {name: name.value, setBornTo: parseInt(born)}})
    setName('')
    setBorn('')
  }

  const authorNames = props.authors.map(author => {
    const authorName = {value: author.name, label: author.name}
    return authorName
  })

  return (
    <div>
      <Select
        value={name}
        onChange={(selectedOption) => setName(selectedOption)}
        options={authorNames}
      />
      <form onSubmit={submit}>
        <div>
          Born year: 
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading){
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      <BirthdayForm setError={props.setError} authors={authors}/>
    </div>
  )
}

export default Authors
