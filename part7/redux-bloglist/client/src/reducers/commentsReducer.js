import blogService from '../services/blogs'

export const initComments = (comments) => {
  return async dispatch => {
    dispatch({
      type: 'INIT_COMMENTS',
      data: {comments}
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    await blogService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: {comment}
    })
  }
}

const commentReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_COMMENTS':
      return action.data.comments
    case 'ADD_COMMENT': 
      return state.concat(action.data.comment)
    default: return state;
  }
}

export default commentReducer