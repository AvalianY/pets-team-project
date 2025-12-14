import axios from 'axios';
import { showError } from './success-stories';

const fetchStories = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/api/',
  params: {
    page: 1,
    limit: 6,
  },
});

export async function getStories() {
  try {
    const { data } = await fetchStories.get('/feedbacks');
    return data.feedbacks;
  } catch (error) {
    return null;
  }
}
