import axios from 'axios';
import { baseUrl } from './config';

export * from '@/api/movie';
export * from '@/api/role';
export * from '@/api/celeb';
export * from '@/api/poll';

export async function getDBMetas() {
  const response = await axios({
    method: 'GET',
    timeout: 60 * 4 * 60 * 1000, // Let's say you want to wait at least 4 hrs
    url: `${baseUrl}/api/rest/admin/database/metas`,
    // headers: { Authorization: `${idToken}` },
  });

  return response.data;
}

export async function createDatabase(years: string[], months: string[]) {
  await axios({
    method: 'GET',
    timeout: 60 * 4 * 60 * 1000, // Let's say you want to wait at least 4 hrs
    url: `${baseUrl}/api/rest/admin/database/create?years=${years}&months=${months}`,
    // headers: { Authorization: `${idToken}` },
  });
}

export async function addImages(metaId: number) {
  await axios({
    method: 'GET',
    timeout: 60 * 4 * 60 * 1000, // Let's say you want to wait at least 4 hrs
    url: `${baseUrl}/api/rest/admin/firebase/add?metaId=${metaId}`,
    // headers: { Authorization: `${idToken}` },
  });
}

export async function deleteImages(metaId: number) {
  await axios({
    method: 'DELETE',
    timeout: 60 * 4 * 60 * 1000, // Let's say you want to wait at least 4 hrs
    url: `${baseUrl}/api/rest/admin/firebase/delete?metaId=${metaId}`,
    // headers: { Authorization: `${idToken}` },
  });
}

export async function addSearch(metaId: number) {
  await axios({
    method: 'GET',
    timeout: 60 * 4 * 60 * 1000, // Let's say you want to wait at least 4 hrs
    url: `${baseUrl}/api/rest/admin/algolia/add?metaId=${metaId}`,
    // headers: { Authorization: `${idToken}` },
  });
}

export async function updateSearch(metaId: number) {
  await axios({
    method: 'GET',
    timeout: 60 * 4 * 60 * 1000, // Let's say you want to wait at least 4 hrs
    url: `${baseUrl}/api/rest/admin/algolia/update?metaId=${metaId}`,
    // headers: { Authorization: `${idToken}` },
  });
}

export async function deleteSearch(metaId: number) {
  await axios({
    method: 'DELETE',
    timeout: 60 * 4 * 60 * 1000, // Let's say you want to wait at least 4 hrs
    url: `${baseUrl}/api/rest/admin/algolia/delete?metaId=${metaId}`,
    // headers: { Authorization: `${idToken}` },
  });
}
