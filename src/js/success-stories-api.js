import axios from 'axios';
import { showError } from './success-stories';

const fetchStories = axios.create({
  baseURL: 'https://paw-hut.b.goit.study/api/',
  params: {
    page: 1,
    limit: 8,
  },
});

export async function getStories() {
  try {
    const { data } = await fetchStories.get('/feedbacks');
    return data.feedbacks;
  } catch (error) {
    showError('Щось пішло не так');
    return [];
  }
}
