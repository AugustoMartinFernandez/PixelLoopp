export const getGifs = async (category) => {
  const apiKey = "Y2Qix32sSM4dzAkxC0u6RCHQpOFHqEEL";
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${category}&limit=20`;
  try {
    const resp = await fetch(url);
    const { data } = await resp.json();
    // Filtrar GIFs duplicados
    const uniqueGifs = data.reduce((acc, gif) => {
      if (!acc.some((item) => item.id === gif.id)) {
        acc.push({
          id: gif.id,
          title: gif.title,
          url: gif.images.downsized_medium.url,
        });
      }
      return acc;
    }, []);
    return uniqueGifs;
  } catch (error) {
    console.error("Error al obtener los GIFs:", error);
    return [];
  }
};
