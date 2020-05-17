import React from 'react'
import {
	Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@material-ui/core'
import {
  useRouteMatch,
} from "react-router-dom"
import { useSelector } from 'react-redux'

const UserView = () => {
	const allUsers = useSelector(state => state.allUsers)

  const match = useRouteMatch('/users/:id')

  const user = match
    ? allUsers.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }

	return (
		<Container>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<TableContainer component={Paper}>
	      <Table>
	        <TableBody>
	          {user.blogs.map(blog => (
	            <TableRow key={blog.id}>
	              <TableCell>
	                {blog.title}
	              </TableCell>
	            </TableRow>
	          ))}
	        </TableBody>
	      </Table>
	    </TableContainer>
    </Container>
	)
}

export default UserView