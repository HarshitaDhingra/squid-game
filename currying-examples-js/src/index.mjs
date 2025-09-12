// function curry(fn) {
//   return function curried(...args) {
//     // If provided args are enough to cover required parameters (ignoring defaults)
//     if (args.length >= fn.length) {
//       return fn(...args); // execute with all provided args
//     } else {
//       return function (...nextArgs) {
//         return curried(...args.concat(nextArgs));
//       };
//     }
//   };
// }

// // Example
// function sum(a, b, c = 0) {
//   return a + b + c;
// }

// const curriedSum = curry(sum);

// console.log(curriedSum(1)(2)(3)); // 6 ✅
// console.log(curriedSum(1, 2)(3)); // 6 ✅
// console.log(curriedSum(1)(2)); // 3 ✅ uses default c=0
// console.log(curriedSum(5, 7)); // 12 ✅ uses default c=0

//2 Convert sum(2,6,1) to sum(2)(6)(1)
const add = (a, b, c) => {
  return a + b + c;
};
console.log(add(1, 2, 3)); // 6

/* Curried Function */
const addCurry = (a) => {
  // takes one argument
  return (b) => {
    //takes second argument
    return (c) => {
      //takes third argument
      return a + b + c;
    };
  };
};
console.log(addCurry(1)(2)(3)); //6

// 3 Evaluate(”sum”)(2)(4) ⇒ 2+4 = 6 on basis of input given to first param.
function sum(operation) {
  return (a) => {
    return (b) => {
      if (operation === "sum") return a + b;
      else if (operation === "multiply") return a * b;
      else if (operation === "divide") return a / b;
      else if (operation === "subtract") return a - b;
      else return "No / Invalid Operation Selected";
    };
  };
}

// 4 Write a currying function that takes infinite arguments.
const summ = function (a) {
  return function (b) {
    if (b) {
      return summ(a + b);
    } else {
      return a;
    }
  };
};

// 5 Write a function curry() that converts f(a,b,c) into a curried function f(a)(b)(c) .
function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
const curriedJoin = curry(join);
// curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(1)(2)(3); // '1_2_3'
curriedJoin(1, 2)(3); // '1_2_3'

//6 Write a function curry() that converts f(a,b,c)
// into a curried function f(a)(b)(c) with placeholder ( _ ) support
function curry(func) {
  return function curried(...args) {
    const sanitizedArgs = args.slice(0, func.length);
    const hasPlaceholder = sanitizedArgs.some(
      (arg) => arg == curry.placeholder
    );
    if (!hasPlaceholder && sanitizedArgs.length == func.length) {
      return func.apply(this, sanitizedArgs);
    }
    return function next(...nextArgs) {
      return curried.apply(this, mergeArgs(sanitizedArgs, nextArgs));
    };
  };
}

function mergeArgs(args, nextArgs) {
  let result = [];
  args.forEach((arg, idx) => {
    if (arg == curry.placeholder) {
      result.push(nextArgs.shift());
    } else {
      result.push(arg);
    }
  });

  // we merge both, because there might be chance that args < nextArgs
  return [...result, ...nextArgs];
}

curry.placeholder = Symbol();
