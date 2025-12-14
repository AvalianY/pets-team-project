import axios from 'axios';

export async function getImagesByQuery(category = '', page = 1) {
    const perPage = window.innerWidth < 768 ? 8 : 9;
    const pageNumber = Number(page) || 1;

    const params = {
        page: pageNumber,
        limit: perPage,
    };

    if (category.trim() !== '') {
        params.name = category;
    }

    const response = await axios.get('https://paw-hut.b.goit.study/api/animals/', { params });
    return response.data;
}

/* Категорії */

export async function getCategoryByQuery() {
    const response = await axios.get('https://paw-hut.b.goit.study/api/categories/', { });
    return response.data;
}