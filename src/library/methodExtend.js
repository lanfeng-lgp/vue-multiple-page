// 方法封装
export default {
    //时间格式化
    formatDate(date, fmt) {
        date = new Date(date);
        let o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          S: date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)){
          fmt = fmt.replace(RegExp.$1,(date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o){
            if (new RegExp("(" + k + ")").test(fmt)){
                fmt = fmt.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return fmt;
    },
    //四舍五入 toFixed提升
    toSuperFixed(d) {
        let s = d + "";
        if (!d) d = 0;
        if (s.indexOf(".") == -1) s += ".";
        s += new Array(d + 1).join("0");
        if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
            let s = "0" + RegExp.$2,
                pm = RegExp.$1,
                a = RegExp.$3.length,
                b = true;
            if (a == d + 2) {
                a = s.match(/\d/g);
                if (parseInt(a[a.length - 1]) > 4) {
                    for (let i = a.length - 2; i >= 0; i--) {
                        a[i] = parseInt(a[i]) + 1;
                        if (a[i] == 10) {
                            a[i] = 0;
                            b = i != 1;
                        } else break;
                    }
                }
                s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
            }
            if (b) s = s.substr(1);
            return (pm + s).replace(/\.$/, "");
        }
        return d + "";
    },
    numberTransformChinese: function(n) {      
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
            return n;
        }
        let unit = "千百十亿千百十万千百十个",str = "";n = String(n);
        unit = unit.substr(unit.length - n.length); // 若为整数，截取需要使用的unit单位
        for (let i = 0; i < n.length; i++) {
            str += "零一二三四五六七八九".charAt(n.charAt(i)) + unit.charAt(i); //遍历转化为大写的数字
        }
        return str.replace(/零(千|百|十)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|个)/g, "$1").replace(/(亿)万|壹(十)/g, "$1$2").replace(/个$/g, ""); // 替换掉数字里面的零字符，得到结果
    },
    pageBack(){
        //返回上一页面，没有就关闭
        if(window.history.length > 1){
          window.history.back();
        }else{
          window.opener = null;
          window.open('', '_self');

          setTimeout(function(){
            window.close();
          },200)
          window.close();
        }      
    }
}