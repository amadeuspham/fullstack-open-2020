const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
	test('of empty list is zero', () => {
	  const blogs = [];

	  const result = listHelper.totalLikes(blogs)
	  expect(result).toBe(0)
	})

	test('when list has 1 blog, equals the likes of that', () => {
	  const blogs = [{
			title: "Sample title",
			author: "Harry",
			url: "http://boom.com",
			likes:2,
	  }];

	  const result = listHelper.totalLikes(blogs)
	  expect(result).toBe(2)
	})

	test('of a bigger list is calculated right', () => {
	  const blogs = [
		  {
				title: "Sample title",
				author: "Harry",
				url: "http://boom.com",
				likes: 2,
		  },
		  {
				title: "Another title",
				author: "Harold",
				url: "http://bang.com",
				likes: 10,
		  }
	  ];

	  const result = listHelper.totalLikes(blogs)
	  expect(result).toBe(12)
	})
})

describe('favorite blog', () => {
	test('of empty list empty', () => {
	  const blogs = [];

	  const result = listHelper.favoriteBlog(blogs)
	  expect(result).toEqual({})
	})

	test('when list has 1 blog, it is that one', () => {
	  const blogs = [{
			title: "Sample title",
			author: "Harry",
			url: "http://boom.com",
			likes:2,
	  }];

	  const result = listHelper.favoriteBlog(blogs)
	  expect(result).toEqual(blogs[0])
	})

	test('of a bigger list is found out right', () => {
	  const blogs = [
		  {
				title: "Sample title",
				author: "Harry",
				url: "http://boom.com",
				likes: 2,
		  },
		  {
				title: "Another title",
				author: "Harold",
				url: "http://bang.com",
				likes: 10,
		  }
	  ];

	  const result = listHelper.favoriteBlog(blogs)
	  expect(result).toEqual({
			title: "Another title",
			author: "Harold",
			url: "http://bang.com",
			likes: 10,
	  })
	})
})

describe('most blogs', () => {
	test('of empty list empty', () => {
	  const blogs = [];

	  const result = listHelper.mostBlogs(blogs)
	  expect(result).toEqual({})
	})

	test('when list has 1 blog, it is that author with 1 blog', () => {
	  const blogs = [{
			title: "Sample title",
			author: "Harry",
			url: "http://boom.com",
			likes:2,
	  }];

	  const result = listHelper.mostBlogs(blogs)
	  expect(result).toEqual({author: blogs[0].author, blogs: 1})
	})

	test('of a bigger list is found out right', () => {
	  const blogs = [
		  {
				title: "Sample title",
				author: "Harry",
				url: "http://boom.com",
				likes: 2,
		  },
		  {
				title: "Another title",
				author: "Harold",
				url: "http://bang.com",
				likes: 10,
		  },
		  {
				title: "Anotherrrrrrr title",
				author: "Harold",
				url: "http://boomsfsfsf.com",
				likes: 1,
		  }
	  ];

	  const result = listHelper.mostBlogs(blogs)
	  expect(result).toEqual({
			author: "Harold",
			blogs: 2,
	  })
	})
})

describe('most likes', () => {
	test('of empty list empty', () => {
	  const blogs = [];

	  const result = listHelper.mostLikes(blogs)
	  expect(result).toEqual({})
	})

	test('when list has 1 blog, it is that author with that number of likes', () => {
	  const blogs = [{
			title: "Sample title",
			author: "Harry",
			url: "http://boom.com",
			likes: 2,
	  }];

	  const result = listHelper.mostLikes(blogs)
	  expect(result).toEqual({author: blogs[0].author, likes: blogs[0].likes})
	})

	test('of a bigger list is found out right', () => {
	  const blogs = [
		  {
				title: "Sample title",
				author: "Harry",
				url: "http://boom.com",
				likes: 2,
		  },
		  {
				title: "Another title",
				author: "Harold",
				url: "http://bang.com",
				likes: 10,
		  },
		  {
				title: "Anotherrrrrrr title",
				author: "Harold",
				url: "http://boomsfsfsf.com",
				likes: 1,
		  }
	  ];

	  const result = listHelper.mostLikes(blogs)
	  expect(result).toEqual({
			author: "Harold",
			likes: 11,
	  })
	})
})