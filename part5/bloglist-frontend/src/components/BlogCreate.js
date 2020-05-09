import React, { useState } from 'react'

import blogService from '../services/blogs'

const BlogCreate = (props) => {
  const { setErrorMessage, setSuccessMessage, addBlogToList } = props

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmitBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title, author, url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      props.toggleVisibility()
      addBlogToList(newBlog)
      setSuccessMessage(`New blog: ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('An error occured when trying to create new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmitBlog}>
        <div>
          title: <input value={title} onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogCreate