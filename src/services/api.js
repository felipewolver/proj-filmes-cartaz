
import axios from "axios";

// base da url: https://api.themoviedb.org/3
// url da api: /movie/now_playing?api_key=d1db5b29b9df4c0c9b47c88939712163&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api; 