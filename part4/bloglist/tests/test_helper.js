const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: "First blog",
    author: "Me",
    url: "No URL",
    likes: 5,
  },
  {
    title: "Second blog",
    author: "Someone else",
    url: "No URL yet",
    likes: 2
  },
]

const initialUsers = [
  {
    username: "admin",
    name: "Me",
    passwordHash: bcrypt.hashSync('firstpassword', 10),
  },
  {
    username: "normalperson",
    name: "Lisa",
    passwordHash: bcrypt.hashSync('safePass', 10),
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}