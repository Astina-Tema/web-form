import axios from "axios";
// import { Message, Loading } from "element-ui";
import { Toast } from 'vant';
// import { baseUrl } from "@/config";

let LOADING
let LOADINGCOUNT = 0
// 错误提示
const errorMessage = (text) => {
  Toast.fail(text)
}
// 错误处理
const errorHandleCode = (status, other) => {
  switch (status) {
    case 401:
      console.log('401')
      break;
    case 403:
      console.log("登录过期，请重新登录");
      break;
    case 404:
      errorMessage('网络请求不存在')
      break;
    default:
      errorMessage('500, 服务器错误')
  }
};
// 服务器返回code错误处理
const errorCode = error => {
  switch (error.status) {
    case "0":
      console.log(error)
      errorMessage(error.message)
      break;
    case "1010":
      errorMessage('数据1010错误')
      break;
    default:
      errorMessage('errors')
  }
};

// 创建通用axios实例
function createBaseInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, //=== "development" ? baseUrl.dev : baseUrl.pro,
    timeout: 120000,
    headers: {
      post: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  })
  // instance.interceptors.response.use(responseSuccess, handleError)
  return instance
}

// response返回status在200 以内
function responseSuccess (config) {
	console.log(config);
  if (config.status === 200) {
    if (config.data.status === "1") return Promise.resolve(config.data)
    // errorCode(config.data);
    return Promise.reject(config);
  } else {
    return Promise.reject(config);
  }
}

// response返回status不在2XX范围内
function handleError (error) {
  const { response } = error;
  if (response) {
    // errorHandleCode(response.status, response.data?.message)
    return Promise.reject(response)
  }else {
    // errorMessage('请检查网络连接')
    return Promise.reject()
  }
}

// 创建全局通用axios
function mixinLoading (interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(
    loadingResPonseInterceptor,
    loadingResPonseError
  )

  // 请求前成功拦截器
  function loadingRequestInterceptor (config) {
    if (!LOADING) {
      LOADING = Toast.loading({
				message: '加载中...',
				forbidClick: true,
				overlay: true,
			})
			// Loading.service({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
    }
    LOADINGCOUNT++
    return config
  }
  // 请求成功在2XX内Loading处理
  function handleResponseLoading () {
    LOADINGCOUNT--
    if (LOADINGCOUNT === 0) {
			LOADING.clear()
      // LOADING.close()
      LOADING = null
    }
  }
  // 返回请求在2XX内
  function loadingResPonseInterceptor (response) {
    handleResponseLoading()
    return Promise.resolve(response)
  }
  // 返回请求在2XX外
  function loadingResPonseError (error) {
    handleResponseLoading()
    return Promise.reject(error)
  }
}

// 普通请求是实例
export const request = createBaseInstance()

// 将全局请求传出去
export const globalRequst = createBaseInstance()
mixinLoading(globalRequst.interceptors)