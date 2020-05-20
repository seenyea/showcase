import axios from 'axios';

const _timeout = 3000;

/**
 * 
 * @param {object} o 
 * @param {sting} method 
 * @returns Promise
 */
const request = (o, method) => {
    const { url = '', data = null, success = null, fail = null ,headers = {}, responseType = 'json', timeout = _timeout } = o;
    const options = {url , method, headers, responseType, timeout};

    if(method === 'get'){
        options.params = data;
    }else{
        options.data = data;
    }

    return axios(options)
    .then(function (response) {
        success && success(response);
    })
    .catch(function (error) {
        fail && fail(error);
    }); 
}

/**
 * api: get
 * @param {object} o 
 * @returns Promise
 */
export const get = (o) => {
    return request(o, 'get');
};

/**
 * api: post
 * @param {object} o 
 * @returns Promise
 */
export const post = (o) => {
    return request(o, 'post');
};

/**
 * api: put
 * @param {object} o 
 * @returns Promise
 */
export const put = (o) => {
    const { url = '', data = null, success = null, fail = null ,headers = {}, responseType = 'json', timeout = _timeout } = o;
    return axios
    .put(url, data, { timeout, headers,responseType })
    .then(function (response) {
        success && success(response);
    })
    .catch(function (error) {
        fail && fail(error);
    });
};

/**
 * api: delete
 * @param {object} o 
 * @returns Promise
 */
export const remove = (o) => {
    const { url = '', data = null, success = null, fail = null ,headers = {}, responseType = 'json', timeout = _timeout } = o;
    return axios
    .delete(url, data, { timeout, headers, responseType })
    .then(function (response) {
        success && success(response);
    })
    .catch(function (error) {
        fail && fail(error);
    });
};

