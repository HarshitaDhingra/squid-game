import "./styles.css";

const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("resolved 1");
  }, 1000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("rejected 2");
  }, 2000);
});

const p3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("resolved 3");
  }, 3000);
});

const p4 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("resolved 4");
  }, 3000);
});

Promise.myAll = function (promises) {
  return new Promise(function (resolve, reject) {
    let result = [];
    let total = 0;

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((res) => {
          result[index] = res;
          total++;
          if (total === promises.length) resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

Promise.myAll([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

Promise.myAll([p1, p3, p4])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
