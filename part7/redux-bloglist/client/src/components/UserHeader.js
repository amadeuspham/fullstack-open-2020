import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  user: {
    marginLeft: 'auto',
    marginRight:0
  },
}));

const UserInfo = ({username, handleLogout}) => {
	const classes = useStyles();

	return (
		<div className={classes.user}>
			<em>{username} logged in</em>
			<Button color="inherit" onClick={handleLogout}>logout</Button>
		</div>
	)
}

const UserHeader = ({ user, handleLogout }) => {
  return (
		<AppBar position="static">
		  <Toolbar>
		    <Button color="inherit" component={Link} to="/">
		      blogs
		    </Button>
		    <Button color="inherit" component={Link} to="/users">
		      users
		    </Button>   
		    {user
		      ? <UserInfo username={user.name} handleLogout={handleLogout}/>
		      : <Button color="inherit" component={Link} to="/login">
		          login
		        </Button>
		    }                              
		  </Toolbar>
		</AppBar>
  )
}

export default UserHeader