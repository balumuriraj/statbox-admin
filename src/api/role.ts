import { request } from '.';


export async function saveOrUpdateRole(role: any): Promise<any> {
  if (role.id) {
    return await request({
      method: 'PUT',
      url: `admin/role/${role.id}`,
      data: role,
    });
  }

  return await request({
    method: 'POST',
    url: `admin/role`,
    data: role,
  });
}

export async function deleteRoleById(id: number): Promise<any> {
  return await request({
    method: 'DELETE',
    url: `admin/role/${id}`,
  });
}

export async function getRolesByMovieId(id: number): Promise<any> {
  return await request({
    method: 'GET',
    url: `roles/movie/${id}`,
  });
}

export async function getRolesByCelebId(id: number): Promise<any> {
  return await request({
    method: 'GET',
    url: `roles/celeb/${id}`,
  });
}
