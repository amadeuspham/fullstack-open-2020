const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'amadeuspham',
      name: 'Harry',
      password: 'gofindolphin',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Another',
      password: '123456',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username or password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const usernameLessUser = {
      name: 'Another',
      password: '123456',
    }

    const result1 = await api
      .post('/api/users')
      .send(usernameLessUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result1.body.error).toContain('Path `username` is required')

    const passwordLessUser = {
      name: 'Another',
      username: '123456',
    }

    const result2 = await api
      .post('/api/users')
      .send(passwordLessUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result2.body.error).toContain('password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username or password is shorter than 3 chars', async () => {
    const usersAtStart = await helper.usersInDb()

    const usernameShortUser = {
      username: 'bo',
      name: 'Another',
      password: '12238572950',
    }

    const result1 = await api
      .post('/api/users')
      .send(usernameShortUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result1.body.error).toContain('Path `username`')
    expect(result1.body.error).toContain('is shorter than the minimum allowed length (3)')

    const passwordShortUser = {
      username: 'Huuuuuuuuu',
      name: 'Another',
      password: '12',
    }

    const result2 = await api
      .post('/api/users')
      .send(passwordShortUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result2.body.error).toContain('password must be longer than 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Another',
      password: '123456',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('when there are multiple users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    let userObject = new User(helper.initialUsers[0])
    await userObject.save()

    userObject = new User(helper.initialUsers[1])
    await userObject.save()
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})