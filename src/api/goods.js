import $axios from '@/utils/request'

export default {
    addGoods(obj){
        return $axios({
            url:'/goods/add',
            method:'post',
            data:obj
        })
    },
    editGoods(obj){
        return $axios({
            url:'/goods/edit',
            method:'post',
            data:obj
        })
    },
    deleteGoods(obj){
        return $axios({
            url:'/goods/del',
            method:'post',
            data:obj
        })
    }
}