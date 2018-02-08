import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react16-a459b.firebaseio.com/'
});

export default instance;