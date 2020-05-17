import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TextField,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import {setTitle, setAuthor, setUrl} from '../reducers/blogCreateReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      width: '25ch',
    },
  },
  button: {
    width: '15ch',
  }
}));

const BlogCreate = ({handleCreateBlog}) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const formValues = useSelector(state => state.blogCreate)
  const {title, author, url} = formValues

  const handleSubmit = async (event) => {
    event.preventDefault()
    handleCreateBlog({title, author, url})
    dispatch(setTitle(''))
    dispatch(setAuthor(''))
    dispatch(setUrl(''))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField id='title' label='Title' value={title} onChange={({ target }) => dispatch(setTitle(target.value))}/>
        <TextField id='author' label='Author' value={author} onChange={({ target }) => dispatch(setAuthor(target.value))} />
        <TextField id='url' label='URL' value={url} onChange={({ target }) => dispatch(setUrl(target.value))} />
        <Button className={classes.button} variant='contained' color='secondary' type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogCreate