const initialState = {
  title: '',
  author: '',
  url: ''
}

export const setTitle = (titleInput) => {
  return async dispatch => {
    dispatch({
      type: 'SET_TITLE',
      data: {titleInput}
    })
  }
}

export const setAuthor = (authorInput) => {
  return async dispatch => {
    dispatch({
      type: 'SET_AUTHOR',
      data: {authorInput}
    })
  }
}

export const setUrl = (urlInput) => {
  return async dispatch => {
    dispatch({
      type: 'SET_URL',
      data: {urlInput}
    })
  }
}

const blogCreateReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_TITLE':
      return {...state, title: action.data.titleInput}
    case 'SET_AUTHOR': 
      return {...state, author: action.data.authorInput}
    case 'SET_URL': 
      return {...state, url: action.data.urlInput}
    default: return state;
  }
}

export default blogCreateReducer