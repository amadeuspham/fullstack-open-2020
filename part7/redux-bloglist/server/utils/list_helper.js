const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0
	} else if (blogs.length === 1){
		return blogs[0].likes
	} else {
		const reducer = (total, blogLike) => total + blogLike
		return blogs.map(blog => blog.likes).reduce(reducer, 0)	
	}
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return {}
	} else if (blogs.length === 1) {
		return blogs[0]
	} else {
		const likesArray = blogs.map(blog => blog.likes)
		const i = likesArray.indexOf(Math.max(...likesArray));
		return blogs[i]
	}
}

const mostBlogs = (blogs) => {
	const authorBlogArray = [];
	const indexOfCurrentAuthor = (blog) => {
		return authorBlogArray.findIndex(abObj => abObj.author === blog.author)
	}
	const mapToAuthorBlog = (blogs) => {
		blogs.forEach(blog => {
			const currentIndex = indexOfCurrentAuthor(blog)
			if (currentIndex === -1){
				authorBlogArray.push({author: blog.author, blogs: 1})
			} else {
				authorBlogArray[currentIndex].blogs += 1
			}
		})
	}

	function compareBlogs(a, b) {
	  const blogsA = a.blogs
	  const blogsB = b.blogs

	  let comparison = 0;
	  if (blogsA > blogsB) {
	    comparison = -1;
	  } else if (blogsA < blogsB) {
	    comparison = 1;
	  }
	  return comparison;
	}

	if (blogs.length === 0) {
		return {}
	} else if (blogs.length === 1) {
		return {author: blogs[0].author, blogs: 1}
	} else {
		mapToAuthorBlog(blogs)
		authorBlogArray.sort(compareBlogs)
		return authorBlogArray[0]
	}
}

const mostLikes = (blogs) => {
	const authorLikeArray = [];
	const indexOfCurrentAuthor = (blog) => {
		return authorLikeArray.findIndex(abObj => abObj.author === blog.author)
	}
	const mapToAuthorLike = (blogs) => {
		blogs.forEach(blog => {
			const currentIndex = indexOfCurrentAuthor(blog)
			if (currentIndex === -1){
				authorLikeArray.push({author: blog.author, likes: blog.likes})
			} else {
				authorLikeArray[currentIndex].likes += blog.likes
			}
		})
	}

	function compareLikes(a, b) {
	  const likesA = a.likes
	  const likesB = b.likes

	  let comparison = 0;
	  if (likesA > likesB) {
	    comparison = -1;
	  } else if (likesA < likesB) {
	    comparison = 1;
	  }
	  return comparison;
	}

	if (blogs.length === 0) {
		return {}
	} else if (blogs.length === 1) {
		return {author: blogs[0].author, likes: blogs[0].likes}
	} else {
		mapToAuthorLike(blogs)
		authorLikeArray.sort(compareLikes)
		return authorLikeArray[0]
	}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}