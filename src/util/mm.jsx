
class MUtil {

    request(param) {

        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: res => {
                    if (res.status === 0) {
                        typeof resolve === "function" && resolve(res.data, res.message);
                    } else if (res.status === 10) {
                        this.doLogin();
                    } else {
                        reject(res.message || res.data);
                    }
                },
                error: err => {
                    reject(err.status);
                }
            });
        });

    }

    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    getUrlParam(name) {
        //?redirect=%2fproduct%2findex
        let queryString = window.location.search.substr(1) || '';
        let  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = queryString.match(reg);
        console.log(result);
        return result ? decodeURIComponent(result[2]) : '';
    }
    // 成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~');
    }

    setKeyValue(key , val){
        let dataType = typeof val;
        let storage = window.localStorage;
        if(dataType === 'object'){
            storage.setItem(key, JSON.stringify(val));
        }

        else if (['string','number','boolean'].indexOf(dataType)){
            storage.setItem(key, val);
        }

        else {
            alert('wrong');
        }
    }

    getValue(key){
        let storage = window.localStorage;

        let data = storage.getItem(key);

        if (data){
            return JSON.parse(data);
        }

        else {
            return '';
        }
    }

    delele(key){
        let storage = window.localStorage;
        storage.removeItem(key);
    }
}



export default MUtil;