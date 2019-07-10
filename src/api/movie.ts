import axios from 'axios';
import { baseUrl } from './config';

export async function getMoviesCount(): Promise<number> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/movies/count`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data.count;
}

export async function getMovies(limit: number, skip: number): Promise<any> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/movies?limit=${limit}&skip=${skip}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function getMovieById(id: number): Promise<any> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/movie/${id}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function deleteMovieById(id: number): Promise<any> {
  const response = await axios({
    method: 'DELETE',
    url: `${baseUrl}/api/rest/admin/movie/${id}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function saveOrUpdateMovie(movie: any): Promise<any> {
  if (movie.id) {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/api/rest/admin/movie/${movie.id}`,
      data: movie,
      // headers: { Authorization: `${idToken}` },
    });

    return res.data;
  }

  const response = await axios({
    method: 'POST',
    url: `${baseUrl}/api/rest/admin/movie`,
    data: movie,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}
