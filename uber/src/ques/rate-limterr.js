// Rate Limiter / Request Throttling Utility (JS) Prompt: Implement a rate limiter / decorator / wrapper around an API
//  such that at most N requests per minute (or per time window) are allowed. 
// Skills: rolling window counters, time buckets, managing promise queue, delays. 

/**
 * Rate Limiter / Request Throttling Utility
 *
 * Allows at most `limit` requests per `windowMs` duration.
 * Wraps any async API call (e.g. fetch, axios, etc.)
 *
 * Example:
 *   const limitedFetch = createRateLimiter(fetch, 5, 10000);
 *   await limitedFetch("https://api.example.com/data");
 */

function createRateLimiter(apiFn, limit, windowMs) {
  const timestamps = []; // sliding window of request start times

  // helper to clean old timestamps
  function cleanWindow(now) {
    while (timestamps.length && now - timestamps[0] >= windowMs) {
      timestamps.shift();
    }
  }

  // delay helper
  function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // the wrapped API function
  return async function limitedApi(...args) {
    let now = Date.now();
    cleanWindow(now);

    // if window is full → wait until space frees up
    if (timestamps.length >= limit) {
      const waitTime = windowMs - (now - timestamps[0]);
      await delay(waitTime);
      now = Date.now();
      cleanWindow(now);
    }

    // record timestamp and execute request
    timestamps.push(now);
    return apiFn(...args);
  };
}

// Example usage
async function example() {
  const limitedFetch = createRateLimiter(
    async (url) => {
      console.log("Calling:", url, "at", new Date().toISOString());
      return url;
    },
    3, // limit = 3 requests
    5000 // per 5 seconds
  );

  // simulate 6 calls in quick succession
  for (let i = 0; i < 6; i++) {
    limitedFetch("https://api.com/" + i);
  }
}

example();
