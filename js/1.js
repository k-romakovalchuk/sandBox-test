function nodeChildCount(node, deep = Infinity) {
  let count = 0;

  function countNodes(node, depth) {
      if (depth <= 0) return;
      count++; 

      for (let childNode of node.childNodes) {
        countNodes(childNode, depth - 1);
      }
  }

  countNodes(node, deep); 
  return count; 
}