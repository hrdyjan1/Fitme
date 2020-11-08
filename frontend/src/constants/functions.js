function print(text, warn) {
  (warn ? console.warn : console.log)(text);
}

function curry(fn) {
  const arity = fn.length;
  return function execution(...args) {
    return args.length < arity ? execution.bind(null, ...args) : fn.call(null, ...args);
  };
}

const noop = () => {};
const head = (xs) => (Array.isArray(xs) ? xs[0] : null);
const match = curry((re, str) => (str ? str.match(re) : null));
const substring = curry((cnt, str) => (str ? str.substring(cnt) : null));
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn(...res)], args)[0];

export {
  noop, print, compose, curry, match, head, substring,
};