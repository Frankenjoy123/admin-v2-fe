
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

}

export default User;