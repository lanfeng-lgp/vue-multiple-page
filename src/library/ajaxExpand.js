// axios 请求方法封装
import http from '../http'
let jsonpAdapter = require('axios-jsonp');

export default {
    ajaxMethod(postType, postUrl, postData, successBack, errorBack, notShowError) {
        let _this = this,
            params = {},
            data = {};
        postType = postType.toUpperCase();
        if (postType == "GET") {
            postData['v'] = new Date().getTime();
            params = postData || {};
        } else if (postType == "POST") {
            data = postData;
        }
        this.$http({
            method: postType,
            url: postUrl,
            params: params,
            data: data,
            withCredentials: true
        }).then((data) => {
            let result = data;
            if (result.status == 1) {
                successBack && successBack(result)
            } else {
                if (!notShowError) {
                    this.$message({
                        showClose: true,
                        message: result.detail || '接口请求出错了！',
                        type: 'error'
                    });
                }
                errorBack && errorBack(result)
            }
        })
    },
    //ajax jsonp请求封装
    getAjaxJsonp(postUrl, postData, callback, errorback, notShowError) {
        this.$http({
            url: postUrl,
            adapter: jsonpAdapter,
            params: postData,
            withCredentials: true
        }).then((data) => {
            let result = data;
            if (result.status == 1) {
                callback && callback(result)
            } else {
                if (!notShowError) {
                    this.$message({
                        showClose: true,
                        message: result.detail || '接口请求出错了！',
                        type: 'error'
                    });
                }
                errorback && errorback(result)
            }
        })
    },
    //图片上传
    uploadFile(postUrl, postData, callback, errorback) {
        const formData = new FormData();
        let keys = Object.keys(postData);
        for (var i = 0; i < keys.length; i++) {
            let name = keys[i];
            formData.append(name, postData[name]);
        }
        this.$http({
            method: 'POST',
            url: postUrl,
            data: formData,
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((data) => {
            let result = data;
            if (result.status == 1) {
                callback && callback(result)
            } else {
                this.$message({
                    showClose: true,
                    message: result.detail || '接口请求出错了！',
                    type: 'error'
                });
                errorback && errorback(result)
            }
        })
    },
    //多图上传
    uploadFiles(postUrl, formData, callback, errorback) {
        this.$http({
            method: 'POST',
            url: postUrl,
            data: formData,
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((data) => {
            let result = data;
            if (result.status == 1) {
                callback && callback(result)
            } else {
                this.$message({
                    showClose: true,
                    message: result.detail || '接口请求出错了！',
                    type: 'error'
                });
                errorback && errorback(result)
            }
        })
    }
}