const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)
const jwt = require('jsonwebtoken')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('Multiple blogs exist', () => {
	it('blogs are returned as json', async () => {
	  await api
	    .get('/api/blogs')
	    .expect(200)
	    .expect('Content-Type', /application\/json/)
	})

	it('all blogs returned', async () => {
	  const response = await api.get('/api/blogs')

	  expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	it('a specific blog (First blog) returned', async () => {
	  const response = await api.get('/api/blogs')
	  const titles = response.body.map(blog => blog.title)

	  expect(titles).toContain("First blog")
	})

	it('all blogs has a unique id', async () => {
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
})

describe('adding and deleting blogs, login required', () => {
	let token = "";

	beforeAll(async () => {
	  await User.deleteMany({})

	  const userObject = new User(helper.initialUsers[0])
	  await userObject.save()

	  const admin = await User.findOne({username: helper.initialUsers[0].username})
	  token = jwt.sign({username: admin.username, id: admin._id}, process.env.SECRET)
	})

	it('able to add a new blog post', async () => {
		const newBlog = {
		  title: "Another blog",
		  author: "Jesse",
		  url: "http://savewalterwhite.com",
		  likes: 5
		}

	  await api
	  	.post('/api/blogs')
	  	.set('Authorization', `Bearer ${token}`)
	  	.send(newBlog)
	  	.expect(200)
	  	.expect('Content-Type', /application\/json/)
	  
	  let ids = []
	  const blogsInDb = await helper.blogsInDb()
	  const titles = blogsInDb.map(blog => blog.title)

	  expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
	  expect(titles).toContain(
	    "Another blog"
	  )
	})

	it('blog w/o "likes" field will automatically default to 0', async () => {
		const newBlog = {
		  title: "Next blog",
		  author: "Flynn",
		  url: "http://gogetthem.com",
		}

	  await api
	  	.post('/api/blogs')
	  	.set('Authorization', `Bearer ${token}`)
	  	.send(newBlog)
	  	.expect(200)
	  	.expect('Content-Type', /application\/json/)

	  const blogsInDb = await helper.blogsInDb()
	  const returnedNewBlog = blogsInDb.find(blog => blog.title === "Next blog")

	  expect(returnedNewBlog.likes).toEqual(0)
	})

	it('blog missing "title" or "url" fields will return 400', async () => {
		const newBlog = {
		  author: "Flynn",
		  likes: 0,
		}

	  await api
	  	.post('/api/blogs')
	  	.set('Authorization', `Bearer ${token}`)
	  	.send(newBlog)
	  	.expect(400)

	  const blogsInDb = await helper.blogsInDb()

	  expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
	})

	it('deleting a blog succeeds with status code 204 if id is valid', async () => {
		const newBlog = {
		  title: "A blog",
		  author: "Someone lalala",
		  url: "http://heyyyyy.com",
		  likes: 4
		}

	  await api
	  	.post('/api/blogs')
	  	.set('Authorization', `Bearer ${token}`)
	  	.send(newBlog)
	  	.expect(200)
	  	.expect('Content-Type', /application\/json/)

	  const blogsBeforeDeleting = await helper.blogsInDb()
	  const titlesBefore = blogsBeforeDeleting.map(blog => blog.title)
	  
	  expect(titlesBefore).toContain(newBlog.title)

	  const deletingBlog = blogsBeforeDeleting.find(blog => blog.title === newBlog.title)

	  await api
	    .delete(`/api/blogs/${deletingBlog.id}`)
	    .set('Authorization', `Bearer ${token}`)
	    .expect(204)

	  const blogsAfterDeleting = await helper.blogsInDb()

	  expect(blogsAfterDeleting).toHaveLength(
	    blogsBeforeDeleting.length - 1
	  )

	  const titlesAfter = blogsAfterDeleting.map(blog => blog.title)

	  expect(titlesAfter).not.toContain(deletingBlog.title)
	})

	it('deleting a blog fails with status code 401 if token is not provided', async () => {
		const newBlog = {
		  title: "A blog",
		  author: "Someone lalala",
		  url: "http://heyyyyy.com",
		  likes: 4
		}

	  await api
	  	.post('/api/blogs')
	  	.set('Authorization', `Bearer ${token}`)
	  	.send(newBlog)
	  	.expect(200)
	  	.expect('Content-Type', /application\/json/)

	  const blogsBeforeDeleting = await helper.blogsInDb()
	  const titlesBefore = blogsBeforeDeleting.map(blog => blog.title)
	  
	  expect(titlesBefore).toContain(newBlog.title)

	  const deletingBlog = blogsBeforeDeleting.find(blog => blog.title === newBlog.title)

	  await api
	    .delete(`/api/blogs/${deletingBlog.id}`)
	    .expect(401)

	  const blogsAfterDeleting = await helper.blogsInDb()

	  expect(blogsAfterDeleting).toHaveLength(blogsBeforeDeleting.length)

	  const titlesAfter = blogsAfterDeleting.map(blog => blog.title)
	  expect(titlesAfter).toContain(deletingBlog.title)
	})
})

test('updating a blog succeeds', async () => {
  const blogsBeforeUpdating = await helper.blogsInDb()

  let updatingBlog = blogsBeforeUpdating[0]
  const originalLikes = updatingBlog.likes
  updatingBlog.likes += 1

  await api
    .put(`/api/blogs/${updatingBlog.id}`)
    .send(updatingBlog)
    .expect(200)

  const blogsAfterUpdating = await helper.blogsInDb()

  expect(blogsAfterUpdating[0].likes).toEqual(originalLikes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})