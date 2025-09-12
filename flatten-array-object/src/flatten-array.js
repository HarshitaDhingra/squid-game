var flat = function (arr, n) {
  const ans = [];
  (function internal(ar, n) {
    ar.forEach((ele) => {
      if (n && Array.isArray(ele)) {
        internal(ele, n - 1);
      } else ans.push(ele);
    });
    return ans;
  })(arr, n);
  return ans;
};

// Input
// arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
// n = 0
// Output
// [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
// A flattened array is a version of that array with some or
// all of the sub-arrays removed and replaced with the
//actual elements in that sub-array. This flattening operation
// should only be done if the current depth of nesting is less than n.
// The depth of the elements in the first array are considered to be 0.

function flattenArray(arr) {
  const ans = [];
  (function internal(ar) {
    ar.forEach((ele) => {
      if (Array.isArray(ele)) {
        internal(ele);
      } else ans.push(ele);
    });
    return ans;
  })(arr);
  return ans;
}
// Example 1
// Input: [1, [2, [3, 4], 5], 6]
// Output: [1, 2, 3, 4, 5, 6]

// // Example 2
// Input: [["a"], ["b", ["c", "d"]], "e"]
// Output: ["a", "b", "c", "d", "e"]
