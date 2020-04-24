import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req
  	.then(res => res.data)
	  .catch(err => {
	    console.log(err);
	  });
}

const create = newObject => {
  const req = axios.post(baseUrl, newObject)
  return req
  	.then(res => res.data)
	  .catch(err => {
	    console.log(err);
	  });
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req
  	.then(res => res)
	  .catch(err => {
	    console.log(err);
	  });
}

const update = (id, newContact) => {
	const req = axios.put(`${baseUrl}/${id}`, newContact)
  return req.then(res => res.data);
}

export default { 
  getAll, 
  create, 
  remove,
  update,
}