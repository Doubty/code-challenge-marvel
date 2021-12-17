import md5 from "md5";
import axios from "axios";

const baseURL = "http://gateway.marvel.com/v1/public";
const apikey = "fc7a193dbdc98cd7f06c00462aaca96a";
const privateKey = "1a3906baba23e1ea27c76ce58ac50193e5a480cf";

const ts = Number(new Date());

const hash = md5(ts + privateKey + apikey);

const api = axios.create({
	baseURL,
	params: {
		ts,
		apikey,
		hash,
	},
});

export const getListMarvel = async () => {
	return await api.get(`/comics`);
};

export default api;
