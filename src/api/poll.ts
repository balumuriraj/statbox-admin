import axios from 'axios';
import { baseUrl } from './config';

export async function getPollsCount(): Promise<number> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/polls/count`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data.count;
}

export async function getPolls(limit: number, skip: number): Promise<any> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/polls?limit=${limit}&skip=${skip}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function getPollById(id: number): Promise<any> {
  const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/poll/${id}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function deletePollById(id: number): Promise<any> {
  const response = await axios({
    method: 'DELETE',
    url: `${baseUrl}/api/rest/admin/poll/${id}`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function saveOrUpdatePoll(poll: any): Promise<any> {
  if (poll.id) {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/api/rest/admin/poll/${poll.id}`,
      data: poll,
      // headers: { Authorization: `${idToken}` },
    });

    return res.data;
  }

  const response = await axios({
    method: 'POST',
    url: `${baseUrl}/api/rest/admin/poll`,
    data: poll,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}
