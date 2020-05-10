import React from 'react'

import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogCreate from './BlogCreate'

const UserView = ({ user, blogs, setBlogs, handleLogout, setErrorMessage, setSuccessMessage, addBlogToList }) => {
  const blogCreateRef = React.createRef()

  const handleCreateBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogCreateRef.current.toggleVisibility()
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

  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })

  const removeBlog = async (blog) => {
    const willDelete = window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}?`)
    if (willDelete) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(remaining => remaining.id !== blog.id))
        setSuccessMessage(`Removed ${blog.title} by ${blog.author}`)
        setTimeout(() => {setSuccessMessage(null)}, 5000)
      } catch (error) {
        setErrorMessage(`Unable to removed ${blog.title} by ${blog.author}`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      }
    } else {
      return
    }
  }

  const likeBlog = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    const unchangedBlogs = blogs.filter(unchanged => unchanged.id !== blog.id)
    setBlogs(unchangedBlogs.concat({...updatedBlog, user: blog.user}))
  }

  return (
    <div>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogCreateRef}>
        <BlogCreate handleCreateBlog={handleCreateBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} likeBlog={likeBlog} username={user.username}/>
      )}
    </div>
  )
}

export default UserView