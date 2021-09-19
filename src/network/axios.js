import Axios from 'axios'

export default function axios(config) {
		// 1.创建axios的实例
		const instance = Axios.create({
			baseURL: 'http://152.136.185.210:7878/api/m5',
			timeout: 5000
		});

		// 配置请求和响应拦截
		instance.interceptors.request.use(config => {
			return config
		}, err => {
			return err
		})

		instance.interceptors.response.use(response => {
			return response.data
		}, err => {
      if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
		})

		// 2.传入对象进行网络请求
		return instance(config)
}
