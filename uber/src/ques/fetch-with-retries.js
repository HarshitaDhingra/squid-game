// Okay. I imagine you are building a client library that needs to be... that needs to fetch data from a remote API, 
// but the network can be flaky. I'd like to implement a function FetchWithRetry, which has URL and retry back off 
// in JavaScript. This does the following. Calls FetchURL to make a request. If the request fails, retries up to retries time.
//  Each retry should wait longer than the previous one. Longer than the previous one. With exponential back offs, 1 second,
//  2 second, 4 second, based on the back off factor. If all retries fails, the function should reject with the error.
//  Keep the solution clean and reusable. Assume a Node.js browser environment with Fetch is available.?

/**
 * Fetch with retries and exponential backoff.
 *
 * @param {string} url - The URL to fetch
 * @param {Object} options - Options for fetch + retry
 * @param {Object} options.fetchOptions - Options passed to fetch()
 * @param {number} options.retries - Number of retry attempts
 * @param {number} options.backoffFactor - Backoff multiplier in ms (default: 1000ms = 1s)
 *
 * @returns {Promise<Response>} - Resolves with the response or rejects after retries
 */
async function fetchWithRetry(
  url,
  {
    fetchOptions = {},
    retries = 3,
    backoffFactor = 1000, // base delay in ms (1s)
  } = {}
) {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const response = await fetch(url, fetchOptions);

      // Treat non-2xx as error (optional depending on use-case)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response; // ✅ Success, return immediately
    } catch (error) {
      if (attempt === retries) {
        throw error; // ❌ Retries exhausted
      }

      const delay = Math.pow(2, attempt) * backoffFactor; // exponential backoff
      console.warn(
        `Attempt ${attempt + 1} failed. Retrying in ${delay / 1000}s...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    attempt++;
  }
}
