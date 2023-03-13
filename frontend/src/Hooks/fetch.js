import axios from 'axios';

const api = 'https://ecommerce-o4gp.onrender.com/';

const sample = {
	"data": {
		"count": 8,
		"next": "https://ecommerce-o4gp.onrender.com/products/list/?page=2",
		"previous": null,
		"results": [
			{
				"url": "/products/7a54047c-5835-40b7-b772-7b84cf4d58f0/",
				"id": "7a54047c-5835-40b7-b772-7b84cf4d58f0",
				"name": "Asus Rog 5",
				"description": "Things are not always what they seem.",
				"price": 250000,
				"category": "Sample",
				"images": []
			},
			{
				"url": "/products/f81f4a99-4829-494f-b632-b9e4137dc75a/",
				"id": "f81f4a99-4829-494f-b632-b9e4137dc75a",
				"name": "ASUS Rog 7",
				"description": "A gamers delight.",
				"price": 2000000,
				"category": "Sample",
				"images": []
			},
			{
				"url": "/products/e7bf87ba-5a38-4e2b-b33f-d95216d4d0e1/",
				"id": "e7bf87ba-5a38-4e2b-b33f-d95216d4d0e1",
				"name": "Motorolla flip",
				"description": "This phone is really dope",
				"price": 200000,
				"category": "Sample",
				"images": []
			}
		]
	},
}

async function _get(url, data = null) {
	try {
		if (data) data = {
			params: data
		};

		const res = await axios.get(`${api}${url}`, data);
		if (res.status !== 200) throw new Error('API fetch not successful');
		return res.data;
	} catch (error) {
		console.error(error);
	}
}

export default _get;