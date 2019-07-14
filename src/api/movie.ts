import { request } from '.';


export async function getMoviesCount(): Promise<number> {
  const response = await request({
    method: 'GET',
    url: `movies/count`,
  });

  return response.count;
}

export async function getMovies(limit: number, skip: number): Promise<any> {
  return await request({
    method: 'GET',
    url: `movies?limit=${limit}&skip=${skip}`,
  });
}

export async function getMovieById(id: number): Promise<any> {
  return await request({
    method: 'GET',
    url: `movie/${id}`,
  });
}

export async function deleteMovieById(id: number): Promise<any> {
  return await request({
    method: 'DELETE',
    url: `admin/movie/${id}`,
  });
}

export async function saveOrUpdateMovie(movie: any): Promise<any> {
  if (movie.id) {
    return await request({
      method: 'PUT',
      url: `admin/movie/${movie.id}`,
      data: movie,
    });
  }

  return await request({
    method: 'POST',
    url: `admin/movie`,
    data: movie,
  });
}
