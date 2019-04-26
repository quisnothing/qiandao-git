import axios from 'axios'
import * as URL from '../../../component/interfaceURL'

export const axiosLogin = function(params, success, error){
    axios.get(URL.login, {
        params:{
            username: params.username,
            password: params.password
        }
    })
    .then((res)=>{
    success(res.data);
    })
    .catch(function (err) {
        error(err);
    });
}
