
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Statistic{

    getHomeCount(){
        let param = {
            url : '/manage/statistic/base_count.do'
        };
        return _mm.request(param);
    }

}

export default Statistic;