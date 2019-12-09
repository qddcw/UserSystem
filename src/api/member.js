import $axios from '@/utils/request'

export default {
    getMemberList(obj) {
        return $axios({
            url: '/member/list/indexSearch',
            method: 'post',
            data:obj
        })
    },
    addMember(obj){
        return $axios({
            url:'/member/add',
            method:'post',
            data:obj
        })
    },
    editMember(obj){
        return $axios({
            url:'/member/edit',
            method:'post',
            data:obj
        })
    },
    deleteMember(obj){
        return $axios({
            url:'/member/del',
            method:'post',
            data:obj
        })
    }
}