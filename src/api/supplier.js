import $axios from '@/utils/request'

export default {
    addSupplier(obj){
        return $axios({
            url:'/supplier/add',
            method:'post',
            data:obj
        })
    },
    editSupplier(obj){
        return $axios({
            url:'/supplier/edit',
            method:'post',
            data:obj
        })
    },
    deleteSupplier(obj){
        return $axios({
            url:'/supplier/del',
            method:'post',
            data:obj
        })
    }
}