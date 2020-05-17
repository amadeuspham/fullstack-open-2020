import React, {useEffect} from 'react'
import {
	Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@material-ui/core'
import {
  Link,
} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import {initAllUsers} from '../reducers/allUsersReducer'

const Users = () => {
	const dispatch = useDispatch()

	const users = useSelector(state => state.allUsers)
	console.log(users)

  useEffect(() => {
    dispatch(initAllUsers())
  }, [dispatch])

	return (
		<Container>
			<h2>Users</h2>
			<TableContainer component={Paper}>
	      <Table>
		      <TableHead>
	          <TableRow>
	            <TableCell>name</TableCell>
	            <TableCell align="right">blogs created</TableCell>
	          </TableRow>
	        </TableHead>
	        <TableBody>
	          {users.map(user => (
	            <TableRow key={user.id}>
	              <TableCell>
	                <Link to={`/users/${user.id}`}>{user.name}</Link>
	              </TableCell>
	              <TableCell align="right">
	                {user.blogs.length}
	              </TableCell>
	            </TableRow>
	          ))}
	        </TableBody>
	      </Table>
	    </TableContainer>
    </Container>
	)
}

export default Users