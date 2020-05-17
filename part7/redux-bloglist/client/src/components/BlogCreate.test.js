import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogCreate from './BlogCreate'

describe('BlogCreate', () => {
  test('form calls handleCreateBlog with the right details when a new blog is called', () => {
    const handleCreateBlog = jest.fn()

    const component = render(
      <BlogCreate 
        handleCreateBlog={handleCreateBlog}
      />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { 
      target: { value: 'A new note' } 
    })
    fireEvent.change(author, { 
      target: { value: 'some author' } 
    })
    fireEvent.change(url, { 
      target: { value: 'lsogjsofg' } 
    })
    fireEvent.submit(form)

    expect(handleCreateBlog.mock.calls).toHaveLength(1)
    expect(handleCreateBlog.mock.calls[0][0].title).toBe('A new note')
    expect(handleCreateBlog.mock.calls[0][0].author).toBe('some author')
    expect(handleCreateBlog.mock.calls[0][0].url).toBe('lsogjsofg')
  })
})
