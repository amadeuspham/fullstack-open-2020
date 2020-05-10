import React, { useState } from 'react'

const BlogCreate = ({handleCreateBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    handleCreateBlog({title, author, url})
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogCreate