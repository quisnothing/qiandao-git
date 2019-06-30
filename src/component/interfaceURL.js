import http from './axiosHttp'
import {message} from 'antd'
import axios from 'axios'
export const baseURL = 'http://167.179.75.22:16666';
import {hex_md5} from './md5';

//用户登录
export function UserLogin(usrname, password){
    const login = baseURL+'/api/user/login';
    var fd = new FormData();
    fd.append('username', usrname);
    fd.append('password', password);
    return new Promise((resolve, reject)=>{
        axios.post(login, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("登录成功");
            }else{
                console.log(res.data);
                message.error("登录失败");
            }
            //console.log(res.data);
            resolve(res)
        })
    })
    // http.post(login, fd).then((res)=>{
    //     return res.data
    // })
}
export const  login = "/data/login.json";

//用户注册
export function UserRegister(email,email_code, phone, password, type, name,
                             stu_code, school, department, profession) {
    const register = baseURL+'/api/user/register';
    var fd = new FormData();
    fd.append('email', email);
    fd.append('email_code', email_code);
    fd.append('phone', phone);
    fd.append('password', password);
    fd.append('type', type);
    fd.append('name', name);
    fd.append('stu_code', stu_code);
    fd.append('school', school);
    fd.append('department', department);
    fd.append('profession', profession);
    return new Promise((resolve, reject)=>{
        axios.post(register, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("注册成功");
            }else{
                console.log(res.data)
                message.error("注册失败");
            }
            //console.log(res.data);
            resolve(res)
        })
    })
}

//忘记密码
export function ForgotPass(token, email, email_code, old_pwd, new_pwd) {
    const forgot_pass = baseURL+'/api/user/password';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('email', email);
    fd.append('email_code', email_code);
    fd.append('old_pwd', old_pwd);
    fd.append('new_pwd', new_pwd);
    return new Promise((resolve, reject)=>{
        axios.put(forgot_pass, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("修改成功");
            }else{
                console.log(res.data)
                message.error("修改失败");
            }
            resolve(res)
        })
    })
}

//修改用户信息
export function AlterUserInfo(token, uid, nick, phone, gender, stu_code, school, insti, depart) {
    const alter_user_info = baseURL + '/api/user/info';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('uid', uid);
    fd.append('nick_name', nick);
    fd.append('phone', phone);
    fd.append('gender', gender);
    fd.append('stu_code', stu_code);
    fd.append('school', school);
    fd.append('department', insti);
    fd.append('profession', depart);
    return new Promise((resolve, reject)=>{
        axios.put(alter_user_info, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("修改成功");
            }else{
                console.log(res.data)
                message.error("修改失败");
            }
            resolve(res)
        })
    })
}

//得到学生列表
export function GetStuList(token, course_id){
    const getStu = baseURL+'/api/course/students';
    return new Promise((resolve, reject)=>{
        axios.get(getStu, {params: {token: token, course_id: course_id},
            headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
    // http.get(getStu, {token: token, course_id: course_id}).then((res)=>{
    //     return res.data
    // })
}
export const get_student = 'http://167.179.75.22:16666/api/course/students';

//添加学生到课程
export function AddStuToCourse(token, stu_code, email, phone, course_id) {
    const add_stu_to_course = baseURL+'/api/course/stu2course';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('stu_code', stu_code);
    fd.append('email', email);
    fd.append('phone', phone);
    fd.append('course_id', course_id);
    return new Promise((resolve, reject)=>{
        axios.post(add_stu_to_course, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("添加成功");
            }else{
                console.log(res.data)
                message.error("添加失败");
            }
            //console.log(res.data);
            resolve(res)
        })
    })
}

//修改学生列表
export function AlterStuInfo(token, id, lack_count) {
    const alter_stu_info = baseURL + '/api/course/students';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('id', id);
    fd.append('lack_count', lack_count);
    return new Promise((resolve, reject)=>{
        axios.put(alter_stu_info, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("修改成功");
            }else{
                console.log(res.data);
                message.error("修改失败");
            }
            resolve(res)
        })
    })
}

//删除学生列表
export function DelStuinfo(token, uid, course_id) {
    const del_stu_info = baseURL + '/api/course/students';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('uid', uid);
    fd.append('course_id', course_id);
    console.log(uid);
    return new Promise((resolve, reject)=>{
        axios.delete(del_stu_info, {data:fd, headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("删除成功");
            }else{
                console.log(res.data);
                message.error("删除失败");
            }
            resolve(res)
        })
    })

}

//得到签到列表
export function GetCheckList(token, course_id){
    const getChk = baseURL+'/api/course/checklist';
    console.log(token, course_id);
    return new Promise((resolve, reject)=>{
        axios.get(getChk, {params: {token: token, course_id: course_id},
            headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
    // http.get(getChk, {token: token, course_id: course_id}).then((res)=>{
    //     return res.data
    // })
}
export const query_signin = 'http://167.179.75.22:16666/api/course/checklist';

//修改签到列表
export function AlterSignList(token, id, remarks, distance) {
    const alter_sign_list = baseURL + '/api/course/checklist';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('id', id);
    fd.append('remarks', remarks);
    fd.append('distance', distance);
    return new Promise((resolve, reject)=>{
        axios.put(alter_sign_list, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("修改成功");
            }else{
                console.log(res.data);
                message.error("修改失败");
            }
            resolve(res)
        })
    })
}

//删除签到列表
export function DelSignList(token, id) {
    const del_sign_list = baseURL + '/api/course/checklist';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('id', id);
    return new Promise((resolve, reject)=>{
        axios.delete(del_sign_list, {data:fd, headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("删除成功");
            }else{
                console.log(res.data);
                message.error("删除失败");
            }
            resolve(res)
        })
    })
}

//添加课程
export function AddCourse(token, uid, course_id) {
    const add_course = baseURL+'/api/course/add';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('uid', uid);
    fd.append('course_id', course_id);
    return new Promise((resolve, reject)=>{
        axios.post(add_course, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("添加成功");
            }else{
                console.log(res.data)
                message.error("添加失败");
            }
            //console.log(res.data);
            resolve(res)
        })
    })
    // http.post(add_course, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("添加成功");
    //     }
    //     return res.data
    // })
}
export const add_course = 'http://167.179.75.22:16666/api/course/add';

//搜索课程
export function SearchCourse(token, keys) {
    const search_course = baseURL + '/api/course/search';
    return new Promise((resolve, reject)=>{
        axios.get(search_course, {params: {token: token, keys: keys},
            headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
    // http.get(search_course, {token: token, keys: keys}).then((res)=>{
    //     return res.data
    // })
}
export const search_course = 'http://167.179.75.22:16666/api/course/search';

//获取课程列表
export function GetCourse(token, uid, type) {
    const get_course = baseURL + '/api/course/course';
    return new Promise((resolve, reject)=>{
        axios.get(get_course, {params: {token: token, uid: uid, type: type},
            headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
    // http.get(get_course, {token: token, uid: uid, type: type}).then((res)=>{
    //     return res.data
    // })
}
export const get_course = '/data/add_class.json';

//创建课程
export function CreateCourse(token, uid, course_name, place, location, time, stu_count, teacher) {
    const create_course = baseURL+'/api/course/create';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('uid', uid);
    fd.append('course_name', course_name);
    fd.append('place', place);
    fd.append('location', location);
    fd.append('time', time);
    fd.append('stu_count', stu_count);
    fd.append('teacher', teacher);
    return new Promise((resolve, reject)=>{
        axios.post(create_course, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("创建成功");
            }else{
                console.log(res.data)
                message.error("创建失败");
            }
            //console.log(res.data);
            resolve(res)
        })
    })
    // http.post(create_course, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("创建成功");
    //     }
    //     return res.data
    // })
}
export const create_course = 'http://167.179.75.22:16666/api/course/create';

//修改课程
export function AlterCourse(token, course_id, course_name, course_code, place, location, time, stu_count, teacher, check_count) {
    const alter_course = baseURL+'/api/course/info';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('course_id', course_id);
    fd.append('course_name', course_name);
    fd.append('course_code', course_code);
    fd.append('place', place);
    fd.append('location', location);
    fd.append('time', time);
    fd.append('stu_count', stu_count);
    fd.append('teacher', teacher);
    fd.append('check_count',check_count);
    return new Promise((resolve, reject)=>{
        axios.put(alter_course, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("修改成功");
            }else{
                console.log(res.data)
                message.error("修改失败");
            }
            resolve(res)
        })
    })
    // http.put(alter_course, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("修改成功");
    //     }
    //     return res.data
    // })
}
export const change_course = 'http://167.179.75.22:16666/api/course/info';

//获取课程详情
export function GetCourseInfo(token, course_id) {
    const course_info = baseURL+'/api/course/info';
    return new Promise((resolve, reject)=>{
        axios.get(course_info, {params: {token: token, course_id: course_id},
            headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
    // http.get(course_info, {token: token, course_id:course_id}).then((res)=>{
    //     return res.data
    // })
}
export const course_info = 'http://167.179.75.22:16666/api/course/info';

//创建字典类
export function CreateType(token, typename) {
    const create_type = baseURL + '/api/dict/create_type';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('typename', typename);
    return new Promise((resolve, reject)=>{
        axios.post(create_type, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("创建成功");
            }else{
                console.log(res.data)
                message.error("创建失败");
            }
            //console.log(res.data);
            resolve(res)
        })
    })
    // http.post(create_type, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("创建成功");
    //     }
    //     return res.data
    // })
}
export const create_type = 'http://167.179.75.22:16666/api/dict/create_type';

//创建字典类的具体信息
export function CreateInfo(token, typeid, type_level, type_belong, info) {
    const create_info = baseURL+'/api/dict/create_info';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('typeid', typeid);
    fd.append('type_level', type_level);
    fd.append('type_belong', type_belong);
    fd.append('info', info);
    return new Promise((resolve, reject)=>{
        axios.post(create_info, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("创建成功");
            }else{
                console.log(res.data)
                console.log(fd);
                message.error("创建失败");
            }
            //console.log(res.data);
            resolve(res)
        })
    })
    // http.post(create_info, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("创建成功");
    //     }
    //     return res.data
    // })
}
export const create_info = 'http://167.179.75.22:16666/api/dict/create_info';

//获取所有大类
export function GetAllTypes(token) {
    const get_types = baseURL+ '/api/dict/types';
    return new Promise((resolve, reject)=>{
        axios.get(get_types, {params: {token: token},
            headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
    // http.get(get_types, {token: token}).then((res)=>{
    //     return res.data
    // })
}
export const get_types = 'http://167.179.75.22:16666/api/dict/types';
//export const get_types = 'http://music.163.com/api/playlist/detail?id=19723756';

//获取具体大类下的类别信息
export function GetTypeChild(token, typeid) {
    const get_type_child = baseURL + '/api/dict/infos';
    return new Promise((resolve, reject)=>{
        axios.get(get_type_child, {params: {token: token, typeid: typeid},
            headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
    // http.get(get_type_child, {token: token, typeid: typeid}).then((res)=>{
    //     return res.data
    // })
}
export const get_type_info = 'http://167.179.75.22:16666/api/dict/infos';

//删除大类
export function DelType(token, typeid) {
    const del_type = baseURL + '/api/dict/type';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('typeid', typeid);
    return new Promise((resolve, reject)=>{
        axios.delete(del_type, {data:fd, headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("删除成功");
            }else{
                console.log(res.data)
                message.error("删除失败");
            }
            resolve(res)
        })
    })
    // http.delete(del_type, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("删除成功");
    //     }
    //     return res.data
    // })
}
export const del_type = 'http://167.179.75.22:16666/api/dict/type';

//删除具体类别信息
export function DelTypeInfo(token, infoid) {
    const del_type_info = baseURL + '/api/dict/info';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('infoid', infoid);
    return new Promise((resolve, reject)=>{
        axios.delete(del_type_info, {data:fd, headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("删除成功");
            }else{
                console.log(res.data)
                message.error("删除失败");
            }
            resolve(res)
        })
    })
    // http.delete(del_type_info, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("删除成功");
    //     }
    //     return res.data
    // })
}
export const del_type_info = 'http://167.179.75.22:16666/api/dict/info';

//修改大类信息
export function AlterType(token, typename, typeid) {
    const change_type = baseURL+'/api/dict/type';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('typename', typename);
    fd.append('typeid', typeid);
    return new Promise((resolve, reject)=>{
        axios.put(change_type, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("修改成功");
            }else{
                console.log(res.data)
                message.error("删除失败");
            }
            resolve(res)
        })
    })
    // http.put(change_type, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("修改成功");
    //     }
    //     return res.data
    // })
}
export const change_type = 'http://167.179.75.22:16666/api/dict/type';

//修改具体类别信息
export function AlterInfos(token, type_level, infoid, type_belong, info) {
    const change_type_info = baseURL+'/api/dict/info';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('type_level', type_level);
    fd.append('infoid', infoid);
    fd.append('type_belong', type_belong);
    fd.append('info', info);
    return new Promise((resolve, reject)=>{
        axios.put(change_type_info, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("修改成功");
            }else{
                console.log(res.data)
                message.error("修改失败");
            }
            resolve(res)
        })
    })
    // http.put(change_type_info, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("修改成功");
    //     }
    //     return res.data
    // })
}
export const change_type_info = 'http://167.179.75.22:16666/api/dict/info';

//通过typename获得父类的所有子类的字典内容
export function GetInfoByName(typename){
    const get_types_by_name = baseURL+ '/api/dict/infos4name';
    return new Promise((resolve, reject)=>{
        axios.get(get_types_by_name, {params: {typename: typename},
            headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
}
//获得角色信息

export const get_role_list = '/data/user_list.json';

//获取验证码
export function GetEmailCode(email) {
    const get_email = baseURL+'/api/user/email_code';
    var fd = new FormData();
    fd.append('email', email);
    return new Promise((resolve, reject)=>{
        axios.post(get_email, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            //console.log(res.data);
            if(res.data.result_code ==='200'){
                message.success("验证码已发送至邮箱");
            }else{
                console.log(res.data)
                message.error("验证码发送失败");
            }
            resolve(res)
        })
    })
    // http.post(get_email, fd).then((res)=>{
    //     if(res.data.result_code ==='200'){
    //         message.success("已发送验证码");
    //     }
    //     return new Promise((resolve, reject)=>{
    //         resolve(res.data)
    //     })
    // })
}
export const get_email_code = 'http://167.179.75.22:16666/api/user/email_code';

//管理用户信息
export function ManageUsers(token, inter_type, page=1, count=20, uid="", nick_name="",
                            phone="", gender="", stu_code="", school="", depart="", profess="", email="", password="", type="", name="") {
    const manage_user = baseURL + '/api/manage/user';
    if(inter_type === '1'){
        var fd = new FormData();
        fd.append('token', token);
        fd.append('inter_type', inter_type);
        fd.append('page', page);
        fd.append('count', count);
        return new Promise((resolve, reject)=>{
            axios.post(manage_user, fd, {headers: {"Content-Type": "multipart/form-data"}}
            ).then((res)=>{
                if(res.data.result_code ==='200'){
                    message.success("成功获取用户信息");
                }else{
                    console.log(res.data);
                    message.error("获取用户信息失败");
                }
                resolve(res)
            })
        })
    }
    else if(inter_type === '2'){
        var fd = new FormData();
        fd.append('token', token);
        fd.append('inter_type', inter_type);
        fd.append('uid', uid);
        fd.append('nick_name', nick_name);
        fd.append('phone', phone);
        fd.append('gender', gender);
        fd.append('stu_code', stu_code);
        fd.append('school', school);
        fd.append('department', depart);
        fd.append('profession', profess);
        return new Promise((resolve, reject)=>{
            axios.post(manage_user, fd, {headers: {"Content-Type": "multipart/form-data"}}
            ).then((res)=>{
                if(res.data.result_code ==='200'){
                    message.success("成功修改用户信息");
                }else{
                    console.log(res.data);
                    message.error("修改用户信息失败");
                }
                resolve(res)
            })
        })
    }
    else if(inter_type === '3'){
        var fd = new FormData();
        fd.append('token', token);
        fd.append('inter_type', inter_type);
        fd.append('uid', uid);
        console.log(uid);
        return new Promise((resolve, reject)=>{
            axios.post(manage_user, fd, {headers: {"Content-Type": "multipart/form-data"}}
            ).then((res)=>{
                if(res.data.result_code ==='200'){
                    message.success("成功删除用户信息");
                }else{
                    console.log(res.data);
                    message.error("删除用户信息失败");
                }
                resolve(res)
            })
        })
    }
    else if(inter_type === '4'){
        var fd = new FormData();
        fd.append('token', token);
        fd.append('inter_type', inter_type);
        fd.append('email', email);
        fd.append('phone', phone);
        fd.append('password', hex_md5(password));
        fd.append('type', type);
        fd.append('name', name);
        fd.append('stu_code', stu_code);
        fd.append('school', school);
        fd.append('department', depart);
        fd.append('profession', profess);
        return new Promise((resolve, reject)=>{
            axios.post(manage_user, fd, {headers: {"Content-Type": "multipart/form-data"}}
            ).then((res)=>{
                if(res.data.result_code ==='200'){
                    message.success("成功创建用户");
                }else{
                    console.log(res.data);
                    message.error("创建用户失败");
                }
                resolve(res)
            })
        })
    }
}

//获取权限列表
export function GetPower(token, page, count) {
    const get_power = baseURL + '/api/manage/power';
    return new Promise((resolve, reject)=>{
        axios.get(get_power, {params: {token: token, page: page, count: count},
            headers: {"Content-Type": "application/json; charset=UTF-8"}}).then((res)=>{
            resolve(res)
        })
    })
}

//修改权限
export function AlterPower(token, id, mUser, mCourse, mCheck, mStudent, mDict, mManage) {
    const alter_power = baseURL+'/api/manage/power';
    var fd = new FormData();
    fd.append('token', token);
    fd.append('id', id);
    fd.append('mUser', mUser);
    fd.append('mCourse', mCourse);
    fd.append('mCheck', mCheck);
    fd.append('mStudent', mStudent);
    fd.append('mDict', mDict);
    fd.append('mManage', mManage)
    return new Promise((resolve, reject)=>{
        axios.post(alter_power, fd, {headers: {"Content-Type": "multipart/form-data"}}
        ).then((res)=>{
            if(res.data.result_code ==='200'){
                message.success("成功修改权限信息");
            }else{
                console.log(res.data);
                message.error("修改权限信息失败");
            }
            resolve(res)
        })
    })
}