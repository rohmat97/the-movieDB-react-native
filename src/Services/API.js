// import {API_KEY, BASE_URL} from '@env';

export const GET = async url => {
  let response = await fetch(
    `${process.env.BASE_URL}${url}?api_key=${process.env.API_KEY}`,
    {method: 'GET'},
  );
  response = response?.json();

  return response;
};
