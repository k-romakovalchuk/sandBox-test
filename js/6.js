function FuncArr(arr) {
  const minNumber = Math.min.apply(null, arr.flat())
  return arr.map(el => {
    return el.map(element => {
      return element = element%2 != 0 ? element*minNumber: element
    });
  })
}