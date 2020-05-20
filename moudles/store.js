const __list = {};

const add = (compsid, methodname, fn) => {
    __list[compsid]= __list[compsid] || {};
    __list[compsid][methodname] = fn
};

const precall = (compsid, methodname) => {
    if(__list[compsid] && __list[compsid][methodname]){
        return __list[compsid][methodname];
    }
    return null;
};

const destory = (compsid, methodname) => {
    if(__list[compsid] && __list[compsid][methodname]){
        __list[compsid][methodname] = null;
    }
};

export default {
    add,
    precall,
    destory
};