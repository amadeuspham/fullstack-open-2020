import React from 'react'
import {
  useRouteMatch,
} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {
  IconButton,
  Divider
} from '@material-ui/core'
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';

import {likeBlog} from '../reducers/blogReducer'
import Comments from './Comments'

const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const match = useRouteMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (!blog) {
    return null
  }

  return (
    <div>
      <Divider />
      <h2>{blog.title} - {blog.author}</h2>
      <div>
        <div>
          <b>URL:</b> {blog.url}
        </div>
        <div>
          <b>LIKES:</b> {blog.likes}
          <IconButton onClick={() => dispatch(likeBlog(blog))}>
            <ThumbUpAlt/>
          </IconButton>
        </div>
        <div>
          <b>ADDED BY:</b> {blog.user.name}
        </div>
        <Divider />
        <Comments blog={blog}/>
      </div>
    </div>
  )

}

export default BlogView
