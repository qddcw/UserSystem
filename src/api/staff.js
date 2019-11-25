import $axios from '@/utils/request'

export default {
    addStaff(obj){
        return $axios({
            url:'/staff/add',
            method:'post',
            data:obj
        })
    },
    editStaff(obj){
        return $axios({
            url:'/staff/edit',
            method:'post',
            data:obj
        })
    },
    deleteStaff(obj){
        return $axios({
            url:'/staff/del',
            method:'post',
            data:obj
        })
    }
}