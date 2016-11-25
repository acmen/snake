/**
 * Created by acmen on 16-11-23.
 */
function init(ele) {
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;
  // ele.style.width = width+"px";
  // ele.style.height = height+"px";
   ele.style.width = height+"px";
   ele.style.height = width+"px";
   ele.setAttribute("class", "rotate90");
   ele.style.marginLeft = width+"px";
}

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}
