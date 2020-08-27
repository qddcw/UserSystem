import axios from 'axios';
import {
    Loading,
    Message
} from 'element-ui'


const baseapi = process.env.VUE_APP_BASE_API;
const $axios = axios.create({   
    baseURL: baseapi,
    timeout: 5000
})

const loading = {
    loadingInstance: null,
    open: function () {
        if (this.loadingInstance === null) {
            this.loadingInstance = Loading.service({
                text: '数据加载中',
                target: '.main',
                background: 'rgba(0,0,0,0.5)'
            })
        }
    },
    close: function () {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null
    }
}
//axios拦截器
$axios.interceptors.request.use(config => {
    loading.open();
    return config;
}, error => {
    loading.close();
    return Promise.reject(error);
})
$axios.interceptors.response.use(res => {
    loading.close();
    const resp = res.data;
    if (resp.code !== 2000) {
        Message({
            message: res.message || '服务器异常',
            type: 'warning',
            duration: 5 * 1000
        })
    }
    return res;
}, error => {
    loading.close();
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error);
})


export default $axios