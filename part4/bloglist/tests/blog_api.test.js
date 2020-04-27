const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
	{
	  title: "First blog",
	  author: "Me",
	  url: "No URL",
	  likes: 5
	},
	{
	  title: "Second blog",
	  author: "Someone else",
	  url: "No URL yet",
	  likes: 2
	},
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog (First blog) returned', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(titles).toContain("First blog")
})

test('all blogs has a unique id', async () => {
  const response = await api.get('/api/blogs')
  let ids = []

  response.body.forEach(blog => {
  	// Check each blog post has an id
  	expect(blog.id).toBeDefined()
  	// Check that the id is unique
  	expect(ids).not.toContain(blog.id)
  	ids.push(blog.id)
  })
})

test('able to add a new blog post', async () => {
	const newBlog = {
	  title: "Another blog",
	  author: "Jesse",
	  url: "http://savewalterwhite.com",
	  likes: 5
	}

  await api
  	.post('/api/blogs')
  	.send(newBlog)
  	.expect(200)
  	.expect('Content-Type', /application\/json/)
  let ids = []

  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    "Another blog"
  )
})

test('blog w/o "likes" field will automatically default to 0', async () => {
	const newBlog = {
	  title: "Next blog",
	  author: "Flynn",
	  url: "http://gogetthem.com",
	}

  await api
  	.post('/api/blogs')
  	.send(newBlog)
  	.expect(200)
  	.expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const returnedNewBlog = response.body.find(blog => blog.title === "Next blog")

  expect(returnedNewBlog.likes).toEqual(0)
})

test('blog missing "title" or "url" fields will return 400', async () => {
	const newBlog = {
	  author: "Flynn",
	  likes: 0,
	}

  await api
  	.post('/api/blogs')
  	.send(newBlog)
  	.expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('deleting a blog succeeds with status code 204 if id is valid', async () => {
	const response = await api.get('/api/blogs')
	const blogsBeforeDeleting = response.body

  const deletingBlog = blogsBeforeDeleting[0]

  await api
    .delete(`/api/blogs/${deletingBlog.id}`)
    .expect(204)

  const afterResponse = await api.get('/api/blogs')
  const blogsAfterDeleting = afterResponse.body

  expect(blogsAfterDeleting).toHaveLength(
    blogsBeforeDeleting.length - 1
  )

  const titles = blogsAfterDeleting.map(blog => blog.title)

  expect(titles).not.toContain(deletingBlog.title)
})

test('updating a blog succeeds', async () => {
	const response = await api.get('/api/blogs')
	const blogsBeforeUpdating = response.body

  let updatingBlog = blogsBeforeUpdating[0]
  const originalLikes = updatingBlog.likes
  updatingBlog.likes += 1

  await api
    .put(`/api/blogs/${updatingBlog.id}`)
    .send(updatingBlog)
    .expect(200)

  const afterResponse = await api.get('/api/blogs')
  const blogsAfterUpdating = afterResponse.body

  expect(blogsAfterUpdating[0].likes).toEqual(originalLikes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})