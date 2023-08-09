import axios from "axios";
import { Notify } from "notiflix";

axios.defaults.headers.common["x-api-key"] = "live_edrFD490c8SmMoGU8Za7OYPvhxbTk1VcDXGnF0pJmKjMOOopixgCRQVZpB9qFnNF";

const BASE_URL = 'https://api.thecatapi.com/v1/breeds'
const BREED_URL = 'https://api.thecatapi.com/v1/images/search'

export async function fetchBreeds() {
        const response = await axios.get(BASE_URL);
        return response.data;
}

export async function fetchCatByBreed(breedId) {
        const response = await axios.get(`${BREED_URL}?breed_ids=${breedId}`);
        return response.data;
}