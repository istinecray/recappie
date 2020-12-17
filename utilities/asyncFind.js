const asyncFind = async (collection, find) => {
  const results = await Promise.all(collection.map(find));
  const index = results.findIndex(Boolean);
  return collection[index];
};

export default asyncFind;
