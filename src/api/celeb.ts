import { request } from '.';

export async function getCelebsCount(): Promise<number> {
  const response = await request({
    method: 'GET',
    url: `celebs/count`,
  });

  return response.count;
}

export async function getCelebs(limit: number, skip: number): Promise<any> {
  return await request({
    method: 'GET',
    url: `celebs?limit=${limit}&skip=${skip}`,
  });
}

export async function getCelebById(id: number): Promise<any> {
  return await request({
    method: 'GET',
    url: `celeb/${id}`,
  });
}

export async function deleteCelebById(id: number): Promise<any> {
  return await request({
    method: 'DELETE',
    url: `admin/celeb/${id}`,
  });
}

export async function saveOrUpdateCeleb(celeb: any): Promise<any> {
  if (celeb.id) {
    return await request({
      method: 'PUT',
      url: `admin/celeb/${celeb.id}`,
      data: celeb,
    });
  }

  return await request({
    method: 'POST',
    url: `admin/celeb`,
    data: celeb,
  });
}
