import "./styles.css";

function MyPromise(executor) {
  let state = "pending"; // pending → fulfilled | rejected
  let value;
  let handlers = [];

  function resolve(result) {
    if (state !== "pending") return;
    state = "fulfilled";
    value = result;
    handlers.forEach(handle);
  }

  function reject(error) {
    if (state !== "pending") return;
    state = "rejected";
    value = error;
    handlers.forEach(handle);
  }

  function handle(handler) {
    if (state === "pending") {
      handlers.push(handler);
    } else if (state === "fulfilled" && handler.onFulfilled) {
      handler.onFulfilled(value);
    } else if (state === "rejected" && handler.onRejected) {
      handler.onRejected(value);
    }
  }

  this.then = function (onFulfilled, onRejected) {
    return new MyPromise((resolveNext, rejectNext) => {
      handle({
        onFulfilled: (val) => {
          try {
            resolveNext(onFulfilled ? onFulfilled(val) : val);
          } catch (e) {
            rejectNext(e);
          }
        },
        onRejected: (err) => {
          try {
            if (onRejected) {
              resolveNext(onRejected(err));
            } else {
              rejectNext(err);
            }
          } catch (e) {
            rejectNext(e);
          }
        },
      });
    });
  };

  this.catch = (onRejected) => this.then(null, onRejected);

  // run the executor immediately
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => resolve("done!"), 1000);
// });

// p.then((val) => {
//   console.log("Resolved with:", val);
//   return "next step";
// }).then((v) => console.log("Chained:", v))
//   .catch((err) => console.error("Error:", err));
