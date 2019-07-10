import axios from 'axios';
import { baseUrl } from './config';

export async function saveOrUpdateRole(role: any): Promise<any> {
  if (role.id) {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/api/rest/admin/role/${role.id}`,
      data: role,
      // headers: { Authorization: `${idToken}` },
    });

    return res.data;
  }

  const response = await axios({
    method: 'POST',
    url: `${baseUrl}/api/rest/admin/role`,
    data: role,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function deleteRoleById(id: number): Promise<any> {
  const response = await axios({
    method: 'DELETE',
    url: `${baseUrl}/api/rest/admin/role/${id}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function getRolesByMovieId(id: number): Promise<any> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/roles/movie/${id}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function getRolesByCelebId(id: number): Promise<any> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/roles/celeb/${id}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}
