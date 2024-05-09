function mapper(mapRules, item) {
  const mappedItem = {};
  mapRules.forEach(rule => {
      const [sourceField, newField, transformFunction] = rule;
      const value = item[sourceField];
      mappedItem[newField] = transformFunction ? transformFunction(value) : value;
  });
  return mappedItem;
}
