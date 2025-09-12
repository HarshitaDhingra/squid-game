import "./styles.css";

var flattendObj = {};
const flattenObject = (obj, keyName = "parent") => {
  Object.keys(obj).forEach((key) => {
    var newKey = `${keyName}_${key}`;
    if (typeof obj[key] === "object") {
      // calling the function again
      flattenObject(obj[key], newKey);
    } else {
      flattendObj[newKey] = obj[key];
    }
  });
};
flattenObject({ a: { b: { c: 2 }, d: 3 } });
console.log(flattendObj);

// // Example 1:
// Input: { a: { b: 1 } }
// Output: { "a.b": 1 }

// // Example 2:
// Input: { a: { b: { c: 2 }, d: 3 } }
// Output: { "a.b.c": 2, "a.d": 3 }

// // Example 3:
// Input: { x: 1, y: { z: { k: 5 } } }
// Output: { "x": 1, "y.z.k": 5 }

// var user = {
//     name: "Vishal",
//     address: {
//       primary: {
//         house: "109",
//         street: {
//           main: "21",
//           cross: "32"
//         }
//       }
//     }
//   };

//   //output
//   {
//     user_name: "Vishal",
//     user_address_primary_house: "109",
//     user_address_primary_street_main: "21",
//     user_address_primary_street_cross: "32",
//   }
