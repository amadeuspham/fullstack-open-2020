import React, { useState } from 'react'

const Blog = ({ blog, removeBlog, username, likeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  return (
    <div style={blogStyle} className='blog'>
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
            likes: {blog.likes}
            <button onClick={() => likeBlog(blog)}>like</button>
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
