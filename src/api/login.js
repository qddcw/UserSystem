import $axios from '@/utils/request'

export function login(username,password){
    return $axios({
        url:"/user/login",
        method:'post',
        data:{
            username:username,
            password:password
        }
    })
}

export function getUserInfo(token){
    return $axios({
        url:`/user/info/${token}`,
        method:'get'
    })
}
export function logout(token){
    return $axios({
        url:`/user/logout`,
        method:'post',
        data:{
            token:token
        }
    })
}