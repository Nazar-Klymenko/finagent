import { axios } from "@api/axiosConfig";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export { fetcher };
