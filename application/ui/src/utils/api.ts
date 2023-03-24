import axios from "axios";

export default axios.create({
	baseURL: "http://big:3000",
	headers: {
		"Content-type": "application/json",
	},
});
