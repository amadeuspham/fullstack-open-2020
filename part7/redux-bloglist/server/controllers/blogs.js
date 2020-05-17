const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const saveBlogWithUserInfo = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
  response.json(saveBlogWithUserInfo.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const {id} = request.params
  const deletingBlog = await Blog.findById(id)

  const decodedRequestToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedRequestToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (decodedRequestToken.id !== deletingBlog.user.toString()) {
    return response.status(401).json({ error: 'you cannot delete this note, it does not belong to you' })
  } else {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    comments: request.body.comments,
    likes: request.body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  const comment = request.body.comment
  const commentedBlog = await Blog.findByIdAndUpdate(id, {comments: blog.comments.concat(comment)}, { new: true })
  response.json(commentedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.json(blog.toJSON())
})

module.exports = blogsRouter