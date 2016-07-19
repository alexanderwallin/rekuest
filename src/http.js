import 'isomorphic-fetch';
import qs from 'qs';

const getUrlQuery = query => {
  if (Object.keys(query).length > 0) {
    return '?' + qs.stringify(query, { encode: false });
  }

  return '';
};

const buildUrl = req => {
  const url = req.url + req.uri + getUrlQuery(req.query);
  return Object.keys(req.params)
    .reduce((parsedUrl, param) => parsedUrl.replace(`:${param}`, req.params[param]), url);
};

export const send = req => {
  const { debug, ...request } = req;

  const url = buildUrl(request);
  const options = {
    method: req.method,
    headers: req.headers,
    body: req.body,
    search: req.query,
  };

  if (debug) {
    console.log('Performing request:');
    console.log(req);
    console.log(url);
    console.log(options);
  }

  return fetch(url, options)
    .then(response => response.json());
};
