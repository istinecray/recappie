export default getOrCreate = (getIdByName, create) => async (name) => {
  let id = await getIdByName(name);
  if (!id) id = await create(name);

  return {
    [name]: id,
  };
};
