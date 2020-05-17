import blogService from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: {blogs}
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD',
      data: {newBlog}
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      data: {updatedBlog, user: blog.user}
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: {id}
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data.blogs
              .sort((a, b) => b.likes - a.likes);
    case 'ADD':
      return state
              .concat(action.data.newBlog)
              .sort((a, b) => b.likes - a.likes);
    case 'LIKE':
      return state
              .filter(blog => blog.id !== action.data.updatedBlog.id)
              .concat({...action.data.updatedBlog, user: action.data.user})
              .sort((a, b) => b.likes - a.likes);
    case 'REMOVE': 
      return state.filter(blog => blog.id !== action.data.id)
    default: return state;
  }
}

export default blogReducer