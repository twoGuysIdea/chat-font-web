/**
 * 公共工具类
 */

/**
 * 刷新方法
 */
function refresh() {
    // 强制刷新当前页
    location.reload(true);
}

/**
 * 延时刷新,默认500
 */
function refreshDelay(ms) {
    var delay = 500;
    if ($.isNumeric(ms)) {
        delay = ms;
    }
    setTimeout(function () {
        // 强制刷新当前页
        location.reload(true);
    }, delay)

}

/**
 * $.ajax 包装方法
 * @param cOption
 */
function ajaxWrap(cOption) {
    // var loading = null;
    var deOption = {
        async: false,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
//            contentType : "application/json; charset=utf-8",
        dataType: 'json',
        type: 'post'
//         beforeSend: function () {
// //                loading层
//             loading = layer.load(1, {
//                 shade: [0.3, '#fff'] //0.1透明度的白色背景
//             });
//             return true;
//         },
        // complete: function () {
        //     layer.close(loading);
        // }
        ,
        error: function (data) {
            alert("程序报错啦！快去报告程序猿");

        }
    };
    deOption = $.extend(deOption, cOption);
    deOption.url = "http://localhost:8091"+cOption.url;
    $.ajax(deOption);
}

/**
 * 金额格式化
 * @param val               值
 * @param decimalPlace      小数位
 */
function floatFormat(val, decimalPlace) {
    if ($.isNumeric(val) && $.isNumeric(decimalPlace)) {
        return parseFloat(val).toFixed(decimalPlace);
    } else {
        return "";
    }
}

/**
 * 时间格式化
 * @param now
 * @param mask
 * @returns {XML|*|string|void}
 * @constructor
 */
function DateFormat(now, mask) {
    var d = now;
    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };

    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return d.getDate();
            case 'dd':
                return zeroize(d.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
            case 'M':
                return d.getMonth() + 1;
            case 'MM':
                return zeroize(d.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
            case 'yy':
                return String(d.getFullYear()).substr(2);
            case 'yyyy':
                return d.getFullYear();
            case 'h':
                return d.getHours() % 12 || 12;
            case 'hh':
                return zeroize(d.getHours() % 12 || 12);
            case 'H':
                return d.getHours();
            case 'HH':
                return zeroize(d.getHours());
            case 'm':
                return d.getMinutes();
            case 'mm':
                return zeroize(d.getMinutes());
            case 's':
                return d.getSeconds();
            case 'ss':
                return zeroize(d.getSeconds());
            case 'l':
                return zeroize(d.getMilliseconds(), 3);
            case 'L':
                var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(m);
            case 'tt':
                return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z':
                return d.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed
            default:
                return $0.substr(1, $0.length - 2);
        }
    });
}


/**
 * 获取表单参数，默认过滤null , "" ,  " ", 0 ,undefined
 * @param $form
 * @return {{}}
 */
function getFormParams($form) {
    var array = $form.serializeArray();
    var map = {};
    if (array && array.length > 0) {
        $.each(array, function (i, obj) {
            if (map.hasOwnProperty(obj.name)) {
                // 检测到已经存在的值，所以转换成数组
                var objVal = map[obj.name];
                if ($.isArray(objVal)) {
                    // 如果是数组，则追加
                    objVal.push(obj.value);
                } else {
                    // 否则将原来的值加入新数组
                    var tArr = [];
                    tArr.push(objVal);
                    var othObjVal = obj.value;
                    if (othObjVal && $.trim(othObjVal)) {
                        tArr.push(othObjVal);
                    }
                    map[obj.name] = tArr;
                }
            } else {
                var firstObjVal = obj.value;
                if (firstObjVal && $.trim(firstObjVal)) {
                    map[obj.name] = firstObjVal;
                }
            }
        })
    }
    return map;
}

/**
 * 生成select的option代码
 * @param optionArrs
 * @param valKey
 * @param textKey
 */
function createOptionHtml(optionArr,valKey,textKey) {
    var htmlOptions = [];
    var $opt = $("<option></option>")
    $.each(optionArr, function (i, obj) {
        var $tOpt = $($opt);
        $tOpt.val(obj[valKey]);
        $tOpt.text(obj[textKey]);
        htmlOptions.push($tOpt.prop("outerHTML"));
    });
    return htmlOptions.join(" ");
}