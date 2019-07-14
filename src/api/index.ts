import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from './config';

export * from '@/api/movie';
export * from '@/api/role';
export * from '@/api/celeb';
export * from '@/api/poll';
export * from '@/api/user';
import { getToken } from '@/support/firebaseUtils';

export async function getDBMetas() {
  return await request({
    url: `admin/database/metas`,
    method: 'GET',
    includeTimeout: true,
  });
}

export async function createDatabase(years: string[], months: string[]) {
  await request({
    url: `admin/database/create?years=${years}&months=${months}`,
    method: 'GET',
    includeTimeout: true,
  });
}

export async function createMovieFromUrl(url: string) {
  await request({
    url: `admin/database/create/movie?url=${url}`,
    method: 'GET',
    includeTimeout: true,
  });
}

export async function addImages(metaId: number) {
  await request({
    url: `admin/firebase/add?metaId=${metaId}`,
    method: 'GET',
    includeTimeout: true,
  });
}

export async function deleteImages(metaId: number) {
  await request({
    url: `admin/firebase/delete?metaId=${metaId}`,
    method: 'DELETE',
    includeTimeout: true,
  });
}

export async function addSearch(metaId: number) {
  await request({
    url: `admin/algolia/add?metaId=${metaId}`,
    method: 'GET',
    includeTimeout: true,
  });
}

export async function updateSearch(metaId: number) {
  await request({
    url: `admin/algolia/update?metaId=${metaId}`,
    method: 'GET',
    includeTimeout: true,
  });
}

export async function deleteSearch(metaId: number) {
  await request({
    url: `admin/algolia/delete?metaId=${metaId}`,
    method: 'DELETE',
    includeTimeout: true,
  });
}

export async function request(params: {
  url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', includeTimeout?: boolean, data?: any, token?: string,
}) {
  const token = params.token || await getToken();
  const options: AxiosRequestConfig = {
    method: params.method,
    url: `${baseUrl}/api/rest/${params.url}`,
    headers: { Authorization: `${token}` },
  };

  if (params.data) {
    options.data = params.data;
  }

  if (params.includeTimeout) {
    options.timeout = 60 * 10 * 60 * 1000; // Let's say you want to wait at least 10 hrs
  }

  const response = await axios(options);
  return response && response.data;
}
