import { request } from '.';


export async function getUsersCount(token: string): Promise<number> {
  const response = await request({
    method: 'GET',
    url: `users/count`,
    token,
  });

  return response.count;
}

export async function grantAdminAccess(email: any, token: string): Promise<number> {
  return await request({
    method: 'GET',
    url: `user/admin/access?email=${email}`,
    token,
  });
}
