import axios from 'axios';
import { baseUrl } from './config';

export async function getCelebsCount(): Promise<number> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/celebs/count`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data.count;
}

export async function getCelebs(limit: number, skip: number): Promise<any> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/celebs?limit=${limit}&skip=${skip}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function getCelebById(id: number): Promise<any> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/celeb/${id}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function deleteCelebById(id: number): Promise<any> {
  const response = await axios({
    method: 'DELETE',
    url: `${baseUrl}/api/rest/admin/celeb/${id}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function saveOrUpdateCeleb(celeb: any): Promise<any> {
  if (celeb.id) {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/api/rest/admin/celeb/${celeb.id}`,
      data: celeb,
      // headers: { Authorization: `${idToken}` },
    });

    return res.data;
  }

  const response = await axios({
    method: 'POST',
    url: `${baseUrl}/api/rest/admin/celeb`,
    data: celeb,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}
