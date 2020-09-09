require('../src/main.js');

// if(module.hot) {
//   module.hot.accept(); // This will make current module replaceable
// }
if(module.hot) {
  let prevTimeoutIndex = -1;
  let prevIntervalIndex = -1;
  let prevRAFIndex = -1;
  module.hot.accept((err) => { // 모듈의 의존사항이 갱신 될 때 호출 (업데이트)
    console.log('err', err);
  });

  // 현재 모듈이 무효화되어 HMR 업데이트가 적용될 때이를 폐기하고 다시 생성
  module.hot.dispose(data => {
    console.log(module.hot.status());
    const tIdx = setTimeout(() => {});
    for (let i = prevTimeoutIndex; i < tIdx; i++) clearTimeout(i);
    prevTimeoutIndex = tIdx;

    const iIdx = setInterval(() => {});
    for (let i = prevIntervalIndex; i < iIdx; i++) clearInterval(i);
    prevIntervalIndex = iIdx;

    const rIdx = requestAnimationFrame(() => {});
    for (let i = prevRAFIndex; i < rIdx; i++) cancelAnimationFrame(i);
    prevRAFIndex = rIdx;
  });
}