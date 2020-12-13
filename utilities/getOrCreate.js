const getOrCreate = (getIdByName, create) => async (name) => {
  let id = await getIdByName(name);

  if (!id) {
    const request = JSON.stringify({
      name,
    });

    id = await create(request);
  }

  return {
    [name]: id,
  };
};

export default getOrCreate;
