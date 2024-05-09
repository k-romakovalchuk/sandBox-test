function chunkArray(arr, chunkSize) {
  for (let i = 0; i < arr.length; i += chunkSize) {
      yield arr.slice(i, i + chunkSize);
  }
}