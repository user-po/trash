/**
 * 节流函数
 * @param {Function} callback 需要被节流的函数
 * @param {Number} duration 距离上次执行超过多少毫秒才会执行被节流的函数
 * @returns
 */
 function throttle(callback, duration = 500) {
    // 最后执行函数时的时间戳
    let lastTime = 0
    return function () {
        // 获取当前时间戳
        const now = new Date().getTime()
        // 判断当前时间距离上一次执行函数的时间是否超过了duration设定的毫秒数
        if (now - lastTime >= duration) { // 超过了
            // 因为我们需要在 page 中做 this.setData()，所以需要借助 call()
            // 利用 call()方法，实现保留原函数的 this 指向，利用JavaScript的arguments对象实现动态接收参数
            callback.call(this, ...arguments);
            // callback(...arguments)
            // 更新最后执行函数时的时间戳
            lastTime = now;
        }
        // 没超过，啥也不干
    }
}
/**
 * 防抖函数
 * @param {Function} callback 需要防抖的函数
 * @param {Number} interval 延迟多少毫秒执行
 * @returns 
 */
 function debounce(callback, interval = 500) {
    let timer
    return function () {
        clearTimeout(timer);
        timer = setTimeout( ()=> {
            callback.call(this, ...arguments);
        }, interval);
    };
}
/**
 * 获取事件回调参数的自定义属性
 * @param {Object} event
 * @param {String} target
 * data-...
 */
function getDataSet(event, target) {
    return event.currentTarget.dataset[target]
}
/**
 * 获取自定义组件事件参数
 * @param {Object} event
 * @param {String} target
 * @returns {*}
 * this.triggerEvent()
 */
 function getEventParam(event, target) {
    return event.detail[target]
}
function formateDate(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}        

export { throttle,getDataSet,getEventParam,debounce,formateDate }