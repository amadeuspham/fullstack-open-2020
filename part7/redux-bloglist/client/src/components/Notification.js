import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification) {
	  const {type, noti} = notification

	  return (
	    <Alert severity={type}>
	      {noti}
	    </Alert>
	  )
  } else {
  	return null
  }
}

export default Notification