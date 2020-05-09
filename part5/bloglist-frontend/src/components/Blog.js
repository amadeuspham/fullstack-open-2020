import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const likeBlog = async () => {
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blogLikes + 1 })
    setBlogLikes(updatedBlog.likes)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>{detailsVisible ? 'hide' : 'view'}</button>
      </div>
      {detailsVisible &&
        <div>
          <div>
            url: {blog.url}
          </div>
          <div>
            likes: {blogLikes}
            <button onClick={likeBlog}>like</button>
          </div>
          <div>
            user: {blog.user.name}
          </div>
          {username === blog.user.username && <button onClick={() => removeBlog(blog)}>remove</button>}
        </div>
      }
    </div>
  )

}

export default Blog
