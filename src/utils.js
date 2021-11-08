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

