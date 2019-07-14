import algoliasearch from 'algoliasearch';

const client = algoliasearch('8P9LT48GR4', 'e1c5b9da0bfcd987c6a43509d7c496cc');
const celebsIndex = client.initIndex('celebs');
const moviesIndex = client.initIndex('movies');

export async function searchMovies(term: string) {
  const res = await moviesIndex.search(term);
  return res.hits;
}

export async function searchCelebs(term: string) {
  const res = await celebsIndex.search(term);
  return res.hits;
}
