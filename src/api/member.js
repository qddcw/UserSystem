import $axios from '@/utils/request'

export default {
    // getMemberList() {
    //     return $axios({
    //         url: '/member/list',
    //         method: 'post'
    //     })
    // }
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