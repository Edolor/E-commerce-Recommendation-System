import axios from 'axios';

export const api = 'https://ecommerce-o4gp.onrender.com/';

export async function _get(url, absoluteURL = false) {
	try {
		const res = await axios.get(absoluteURL ? url : `${api}${url}`);
		if (res.status !== 200) throw new Error('API get not successful');
		return res.data;
	} catch (error) {
		console.error(error);
	}
}

export async function _post(url, data) {
	try {
		const res = await axios.post(`${api}${url}`, data);
		console.log(res);
		if (!(res.status >= 200 && res.status <= 202)) throw new Error('API post not successful');
		return res.data;
	} catch (error) {
		console.error(error);
	}
}