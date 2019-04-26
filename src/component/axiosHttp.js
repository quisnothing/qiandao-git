import axios from 'axios'
import {message} from 'antd'
import qs from 'qs'

let http={
    post: "",
    get: ""
};

http.post = function (api, data) {
    let params = JSON.stringify(data);
    return new Promise((resolve, reject)=>{
        axios.post(api, data, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            console.log(res.data);
            resolve(res)
        })
    })
}

http.delete = function (api, data) {
    let params = JSON.stringify(data);
    return new Promise((resolve, reject)=>{
        axios.delete(api, {params:data, headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            console.log(res.data);
            resolve(res)
        })
    })
}

http.put = function (api, data) {
    let params = JSON.stringify(data);
    return new Promise((resolve, reject)=>{
        axios.put(api, data, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            console.log(res.data);
            resolve(res)
        })
    })
}

http.get = function (api, data) {
    let params = JSON.stringify(data);
    return new Promise((resolve, reject)=>{
        axios.get(api, {params: data, headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
}

export default http