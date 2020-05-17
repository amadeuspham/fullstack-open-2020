import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Table,
  TableContainer,
  TableBody,
  Paper
} from '@material-ui/core'

import {addNoti} from '../reducers/notificationReducer'
import {addBlog, removeBlog} from '../reducers/blogReducer'

import Blog from './Blog'
import Togglable from './Togglable'
import BlogCreate from './BlogCreate'

const Profile = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  const blogCreateRef = React.createRef()

  const handleCreateBlog = async (blog) => {
    try {
      blogCreateRef.current.toggleVisibility()
      dispatch(addBlog(blog))
      dispatch(addNoti(`New blog: ${blog.title} by ${blog.author} added`, 'success', 5))
    } catch (exception) {
      dispatch(addNoti('An error occured when trying to create new blog', 'error', 5))
    }
  }

  const handleRemoveBlog = async (blog) => {
    const willDelete = window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}?`)
    if (willDelete) {
      try {
        dispatch(removeBlog(blog.id))
        dispatch(addNoti(`Removed ${blog.title} by ${blog.author}`, 'success', 5))
      } catch (error) {
        dispatch(addNoti(`Unable to removed ${blog.title} by ${blog.author}`, 'error', 5))
      }
    } else {
      return
    }
  }

  return (
    <Container>
      <Togglable buttonLabel='new blog' ref={blogCreateRef}>
        <BlogCreate handleCreateBlog={handleCreateBlog}/>
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} removeBlog={handleRemoveBlog} username={user.username}/>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Profile