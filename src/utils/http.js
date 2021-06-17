import axios from 'axios'
import Encrypt from './encrypt'

const http = axios.create({
	baseURL: '/api',
	header: {
		'content-type': 'application/x-www-form-urlencoded'
	},
	transformRequest: [function (data, headers) {
    return {
			"reg": Encrypt.Encrypt({...data}),
			"t": "JSON"
		}
  }]
})

export default http