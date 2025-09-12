import "./styles.css";
const input = {
  a: 1,
  b: {
    c: 2,
    d: -3,
    e: {
      f: {
        g: -4,
      },
    },
    h: {
      i: 5,
      j: 6,
    },
  },
};

const callback = (element) => element >= 0;

function filter(obj, callback) {
  if (typeof obj !== "object" || obj === null) {
    return callback(obj) ? obj : undefined;
  }

  const result = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const value = filter(obj[key], callback);
    if (
      value !== undefined &&
      (typeof value !== "object" || Object.keys(value).length > 0)
    ) {
      result[key] = value;
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

const filtered = filter(input, callback);
console.log(filtered);
