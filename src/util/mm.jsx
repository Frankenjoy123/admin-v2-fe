
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
                        doLogin();
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
        window.location.href = '/login';
    }

    getUrlParam(name) {
        //?redirect=%2fproduct%2findex
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("^|&" + name + "=([^&]*)(&|$)");
        let result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : '';
    }

    errorTips(errorMsg) {

    }
}



export default MUtil;