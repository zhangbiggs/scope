import papaparse from 'papaparse'
export function throttle(fn, wait) {
    var timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context, args);
                timer = null;
            }, wait)
        }
    }
}
/** 
* @desc 函数防抖 
* @param func 回调函数 
* @param wait 延迟执行毫秒数 
*/ 
export function debounce(func, wait) { 
    let timeout; 
    return function () { 
        let context = this; 
        let args = arguments; 
        timeout?clearTimeout(timeout):null; 
        timeout = setTimeout(() => { 
            func.apply(context, args) 
            
        }, wait);
     } 
 } 
//  document.body.onclick= debounce(function () { console.log(this) },1000)


var obj_csv = {
    size: 0,
    dataFile: []
};
export function readCSV(input, fn, errorFn) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);
        reader.onload = function (e) {
            obj_csv.size = e.total;
            obj_csv.dataFile = e.target.result
            var response = papaparse.parse(obj_csv.dataFile)
            if (response.errors.message) {
                errorFn && errorFn(response.errors.message)
            } 
            console.log(response.data)
            fn(response.data)
            
        }
    }
}

