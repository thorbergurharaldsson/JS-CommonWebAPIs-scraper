export const getItems = async (url) => {
  //connect to API
  const conn = await fetch(url);
  // Get the data from the API
  const res = await conn.json();

  return res;
};
