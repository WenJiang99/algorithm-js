function koaCompose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

function koaComposeV2(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  return function (context, next) {
    // last called middleware #
    let lastMiddleware = -1;
    return dispatch(0)
    async function dispatch(i) {
      if (i <= lastMiddleware) throw new Error('next() called multiple times');
      lastMiddleware = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return;
      return await fn(context, dispatch.bind(null, i + 1));
    }
  }
}

function composeUseLoop(...middleware) {
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('fn must be composed of functions!')
  }
  return function (...args) {
    let res;
    for (let i = 0; i < middleware.length; i++) {
      const fn = middleware[i];
      if (i === 0) {
        res = fn(...args);
      } else {
        res = fn(res);
      }
    }
    return res;
  }
}
function composeUseReduce(...middleware) {
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new typeerror('fn must be composed of functions!')
  }
  return middleware.reduce(
    (composed, fn) => (...args) => fn(composed(...args))
  )
}

const fn = composeUseReduce(
  (x, next) => {
    x = x + 1;
    console.log('x + 1', x)
    // next();
    // console.log('x + 1', x)
    return x;
  },

  (x, next) => {
    x = x + 2;
    console.log('x + 2', x)
    // next();
    // console.log('x + 2', x)
    return x;
  },
  (x, next) => {
    x = x + 3;
    console.log('x + 3', x)
    // next();
    // console.log('x + 3', x)
    return x;
  },
  x => console.log(x)
);
fn(0)
module.exports = {
  composeUseLoop,
  composeUseReduce
}