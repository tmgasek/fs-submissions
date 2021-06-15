import axios from 'axios';
import storage from '../utils/storage';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: `bearer ${storage.loadUser().token}` },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: `bearer ${storage.loadUser().token}` },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const blogService = {
  getAll,
  create,
  update,
  remove,
};

export default blogService;
