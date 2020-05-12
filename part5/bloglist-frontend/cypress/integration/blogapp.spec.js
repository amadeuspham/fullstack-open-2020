describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Harry',
      username: 'amadeuspham',
      password: 'harrypassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
    	cy.get('#username').type('amadeuspham')
    	cy.get('#password').type('harrypassword')
      cy.get('#login-button').click()

      cy.get('.success').contains('Logged in successfully')
    })

    it('fails with wrong credentials', function() {
    	cy.get('#username').type('amadeuspham')
    	cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
    	cy.get('#username').type('amadeuspham')
    	cy.get('#password').type('harrypassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a title')
      cy.get('#author').type('an author')
      cy.get('#url').type('a link')
      cy.contains('create').click()

      cy.get('.success').contains('added')
      cy.contains('a title - an author')
    })

    it('User can like a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a title')
      cy.get('#author').type('an author')
      cy.get('#url').type('a link')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('likes: 0')
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('User can delete a blog he/she created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a title')
      cy.get('#author').type('an author')
      cy.get('#url').type('a link')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('.success').contains('Removed')
    })

    it('Blogs are sorted by no. likes', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a title')
      cy.get('#author').type('an author')
      cy.get('#url').type('a link')
      cy.contains('create').click()

      cy.contains('new blog').click()
      cy.get('#title').type('another title')
      cy.get('#author').type('another author')
      cy.get('#url').type('another link')
      cy.contains('create').click()

      cy.visit('http://localhost:3000')

      cy.get('.blog:first').contains('a title - an author')
      cy.get('.blog:last').contains('another title - another author')

      cy.contains('another title - another author').parent().find('button').click()
      cy.contains('button', 'like').click()
      cy.contains('likes: 1')
      cy.contains('hide').click()

      cy.get('.blog:first').contains('another title - another author')
      cy.get('.blog:last').contains('a title - an author')
    })
  })
})