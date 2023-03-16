// 移动端rem适配-默认初始设计稿750
// fnResize();
// window.onresize = function () {
//   fnResize();
// };

// function fnResize() {
//   let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
//   let initWidth = 750;
//   let rate = 7.5;
//   if (deviceWidth >= initWidth) {
//     deviceWidth = initWidth;
//   }
//   if (deviceWidth <= 320) {
//     deviceWidth = 320;
//   }
//   document.documentElement.style.fontSize = deviceWidth / rate + "px";
// }

// pc端
function resizeRoot() {
  const deviceWidth: number = document.documentElement.clientWidth;
  if (deviceWidth < 1366) {
    document.documentElement.style.fontSize = "99.99px";
  } else {
    const one = (deviceWidth / 1366) * 100;
    const computedPx: number = parseFloat(one as any);
    const lastPx: any = (computedPx.toFixed(3) as any) - 0.01 + "px";
    document.documentElement.style.fontSize = lastPx;
  }
}
resizeRoot();
window.onresize = function () {
  resizeRoot();
};
export {};
