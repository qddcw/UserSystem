import router from './router';
import {getUserInfo} from '@/api/login'
import Vue from "vue";

router.beforeEach((to,from,next)=>{
    const token = localStorage.getItem("token");
    let v1=new Vue();
    if(!token){
        if(to.path!=='/login'){
            v1.$message({
                message:"请先登录!",
                type:'warning'
            });
            next({path:'/login'})
        }else {
            next();
        }
    }else{
        if(to.path==="/login"){
            v1.$message({
                message:"请先注销!",
                type:'warning'
            });
            next({path:from.path})
        }else {
            const userinfo = localStorage.getItem("userinfo");
            if(userinfo){
                next();
            }else {
                getUserInfo(token).then(res=>{
                    const data = res.data;
                    if(data.flag){
                        localStorage.setItem("userinfo",JSON.stringify(data.data));
                        next();
                    }else {
                        v1.$message({
                            message:data.message,
                            type:'warning'
                        });
                        next({path:'/login'})
                    }
                })
            }
        }
    }
})