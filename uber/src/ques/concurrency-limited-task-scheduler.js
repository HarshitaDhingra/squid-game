async function scheduleTasks(functions, limit) {
  const results = new Array(functions.length);
  let currentIndex = 0;

  async function worker() {
    if (currentIndex > functions.length) {
      return;
    }
    const index = currentIndex++;
    try {
      results[index] = await functions[index]();
    } catch (err) {
      throw err;
    }
    finally {
      if (currentIndex < functions.length) {
        return worker();
      }
    }

  }
  const workers = Array(Math.min(limit, functions.length))
    .fill(null)
    .map(() => worker());
  await Promise.all(workers);
  return results;
}


module.exports = scheduleTasks;
