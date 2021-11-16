import papaparse from 'papaparse'
// import Encoding from 'encoding'
// import Encoding  from 'encoding-japanese';

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
        timeout ? clearTimeout(timeout) : null;
        timeout = setTimeout(() => {
            func.apply(context, args)

        }, wait);
    }
}
//  document.body.onclick= debounce(function () { console.log(this) },1000)


// var obj_csv = {
//     size: 0,
//     dataFile: []
// };
export function readCSV(input, fn) {
    if (input.files && input.files[0]) {
        let file = input.files[0]
        let reader = new FileReader();
        reader.onload = function () {
            // var codes = new Uint8Array(e.target.result);
            // var encoding = Encoding.detect(codes);
            // console.log(encoding)
            // console.log(encoding);
            // var files = event.target.files;
            papaparse.parse(file, {
                skipEmptyLines: true,  // need this or papaparse adds a blank entry (despite csv only have 5 lines, it gives a 6th empty string)
                // header: true, // testing adding a source/target header
                encoding: 'UTF8',
                complete: function (results) {
                    // console.log(results)
                    fn && fn(results.data)
                }
            });
        };

        reader.readAsArrayBuffer(file);
    }
}

// var csvFileData = [
//     ['Alan Walker', 'Singer'],
//     ['Cristiano Ronaldo', 'Footballer'],
//     ['Saina Nehwal', 'Badminton Player'],
//     ['Arijit Singh', 'Singer'],
//     ['Terence Lewis', 'Dancer']
//  ];

//create a user-defined function to download CSV file 
export function download_csv_file(headerData, bodyData) {
    var csv = headerData.join(',') + '\n';
    bodyData.forEach(function (row) {
        csv += row.join(',');
        csv += "\n";
    });
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';

    hiddenElement.download = 'scope.csv';
    hiddenElement.click();
}
