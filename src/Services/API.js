// @ts-nocheck
// import {API_KEY, BASE_URL} from '@env';

export const GET = async (url, page = 1, query = '') => {
  let response = await fetch(
    `${process.env.BASE_URL}${url}?${query}&api_key=${process.env.API_KEY}&page=${page}`,
    {method: 'GET'},
  );
  response = response?.json();

  return response;
};
