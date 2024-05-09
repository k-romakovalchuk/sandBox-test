function bulkRun(functions) {
  const results = [];

  const promises = functions.map(([fn, args]) => {

      return new Promise(resolve => {
          fn(...args, result => {
              results.push(result);
              resolve();
          });
      });
  });

  return Promise.all(promises).then(() => results);
}