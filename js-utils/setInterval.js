function mySetInterval(cb, timeout, ...args) {
  if (typeof cb !== 'function') return;
  timeout = typeof timeout === 'number' ? timeout : 0;
  let timer;
  function fn() {
    cb(...args);
    if (!timer) return;
    timer = setTimeout(fn, timeout);
  }
  timer = setTimeout(fn, timeout);
  return {
    stop: () => {
      clearTimeout(timer);
      timer = null;
    }
  }
}


let i = 0;
function f(x, y, z) {
  const now = Date.now();
  console.log('i -> ', i, x, y, z, 'at:', now - start);
  start = now;
  i++;
  if (i > 10) {
    t.stop();
  }
}
let start = Date.now();
const t = mySetInterval(f, 200, 1, 2, 3)