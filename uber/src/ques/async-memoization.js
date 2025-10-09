// Uber question: implement a memoization wrapper around an async function. in js

function memoizeAsync(fn) {
  const cache = new Map(); // key -> Promise or resolved value

  return async function(...args) {
    const key = JSON.stringify(args);

    // If already cached (either promise or value), return it
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Call the async function and store the promise immediately
    const promise = fn(...args)
      .then(result => {
        cache.set(key, result); // replace promise with resolved value
        return result;
      })
      .catch(err => {
        cache.delete(key); // avoid caching rejected calls
        throw err;
      });

    cache.set(key, promise);
    return promise;
  };
}
//
const slowFetch = async (id) => {
  console.log('Fetching', id);
  await new Promise(r => setTimeout(r, 1000));
  return { id, data: `Data for ${id}` };
};

const memoizedFetch = memoizeAsync(slowFetch);

(async () => {
  console.time("first");
  console.log(await memoizedFetch(1)); // Fetches
  console.timeEnd("first");

  console.time("second");
  console.log(await memoizedFetch(1)); // Instant
  console.timeEnd("second");
})();
