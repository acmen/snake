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