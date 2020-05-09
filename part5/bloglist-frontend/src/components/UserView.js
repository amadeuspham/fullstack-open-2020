import React from 'react'

import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogCreate from './BlogCreate'

const UserView = ({ user, blogs, setBlogs, handleLogout, setErrorMessage, setSuccessMessage, addBlogToList }) => {

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

  return (
    <div>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog'>
        <BlogCreate setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} addBlogToList={addBlogToList}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} username={user.username}/>
      )}
    </div>
  )
}

export default UserView