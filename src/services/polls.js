import axios from 'axios'
const baseUrl = 'http://localhost:3001/polls'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

function get(id) {
  return axios.get(`${baseUrl}/${id}`);
}


export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  get: get
}