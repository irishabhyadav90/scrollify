import axios from 'axios';

const API_URL = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';


export const fetchPosts = async (page: number, limit: number) => {
    try {
        const response = await axios.get(`${API_URL}/posts?_page=${page}&_limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};
