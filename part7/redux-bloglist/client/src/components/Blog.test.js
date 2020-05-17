import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    title: 'Testingggggg',
    author: 'Harry',
    url: 'dunno',
    likes: 5,
    user: {
      name: "Harry",
      username: "admin"
    },
  }

  test('renders title & author but not other details by default', () => {
    const component = render(
      <Blog blog={blog} username='admin'/>
    )
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('url and no. likes are shown when button is clicked', () => {
    const component = render(
      <Blog blog={blog} username='admin'/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('event handler activated twice when like button clicked twice', () => {
    const likeBlog = jest.fn()

    const component = render(
      <Blog blog={blog} likeBlog={likeBlog} username='admin'/>
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
