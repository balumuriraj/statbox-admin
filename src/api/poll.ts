import { request } from '.';

export async function getPollsCount(): Promise<number> {
  const response = await request({
    method: 'GET',
    url: `polls/count`,

  });

  return response.count;
}

export async function getPolls(limit: number, skip: number): Promise<any> {
  return await request({
    method: 'GET',
    url: `polls?limit=${limit}&skip=${skip}`,
  });
}

export async function getPollById(id: number): Promise<any> {
  return await request({
    method: 'GET',
    url: `poll/${id}`,
  });
}

export async function deletePollById(id: number): Promise<any> {
  return await request({
    method: 'DELETE',
    url: `admin/poll/${id}`,
  });
}

export async function saveOrUpdatePoll(poll: any): Promise<any> {
  if (poll.id) {
    return await request({
      method: 'PUT',
      url: `admin/poll/${poll.id}`,
      data: poll,
    });
  }

  return await request({
    method: 'POST',
    url: `admin/poll`,
    data: poll,
  });
}
