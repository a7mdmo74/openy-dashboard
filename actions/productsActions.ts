export const fetchData = async (page = 1, limit = 15) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};
