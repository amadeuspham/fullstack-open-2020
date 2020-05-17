import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TextField,
  Button,
} from '@material-ui/core'

import {addComment, initComments} from '../reducers/commentsReducer'

const Comments = ({blog}) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(initComments(blog.comments))
  }, [dispatch, blog.comments])

  const comments = useSelector(state => state.comments)

  const randKey = () => Math.floor(Math.random() * 10000); 

  const handleSubmitComment = event => {
    event.preventDefault()
    dispatch(addComment(blog.id, {key: randKey(), content: comment}))
    setComment('')
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmitComment}>
        <TextField id='comment' label='Add a comment' value={comment} onChange={({ target }) => setComment(target.value)}/>
        <Button type="submit" color='secondary'>create</Button>
      </form>
      <ul>
        {comments.map(comment => 
          <li key={comment.key ? comment.key : comment.content}>{comment.content}</li>
        )}
      </ul>
    </div>
  )

}

export default Comments
