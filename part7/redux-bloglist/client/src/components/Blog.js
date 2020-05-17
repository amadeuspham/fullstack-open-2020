import React from 'react'
import {
  Link,
} from "react-router-dom"
import {
  TableCell,
  TableRow,
  Button
} from '@material-ui/core'

const Blog = ({ blog, removeBlog, username }) => {
  return (
    <TableRow className='blog'>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} - {blog.author}
        </Link>
      </TableCell>
      <TableCell>
        {username === blog.user.username && <Button onClick={() => removeBlog(blog)}>remove</Button>}
      </TableCell>
    </TableRow>
  )

}

export default Blog
