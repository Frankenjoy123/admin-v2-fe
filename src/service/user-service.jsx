
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class User{

    login(userInfo){

        let param = {
            type : 'post',
            url : '/manage/user/login.do',
            data : userInfo
        };

        return _mm.request(param);
    }

    logout(){
        let param = {
            type : 'post',
            url : '/user/logout.do'
        };

        return _mm.request(param);
    }

    checkLoginInfo(userInfo){
        let userNmae = $.trim(userInfo.username),
            password = $.trim(userInfo.password);
        if(typeof userInfo.username !== 'string' || userInfo.username.length===0){
            return {
                status : false,
                msg : '用户名不能为空'
            }
        }

        if(typeof userInfo.password !== 'string' || userInfo.password.length===0){
            return {
                status : false,
                msg : '密码不能为空'
            }
        }

        return {
            status : true,
            msg : '验证通过'
        }
    }

    getUserList(pageNum){
        return _mm.request({
            type : 'post',
            url : '/manage/user/list.do',
            data : {
                pageNum : pageNum
            }
        });
    }

}

export default User;