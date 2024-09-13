import axios from 'axios';

export const fetchUsers = async () => {
  return await axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data);
};
