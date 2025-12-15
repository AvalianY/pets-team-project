import axios from 'axios';

export async function getImagesByQuery( categoryId, page = 1) {
    const perPage = window.innerWidth < 1440 ? 8 : 9;
    const pageNumber = Math.max(1, Number(page) || 1);

    const params = {
        page: pageNumber,
        limit: perPage,

    };

    if (categoryId) {
        params.categoryId = categoryId;
    }

    const response = await axios.get('https://paw-hut.b.goit.study/api/animals/', { params });
    return response.data;
}

/* Категорії */

export async function getCategoryByQuery() {
    const response = await axios.get('https://paw-hut.b.goit.study/api/categories/', { });
    return response.data;
}