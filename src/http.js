import 'isomorphic-fetch';
import qs from 'qs';

const getUrlQuery = query => {
  if (Object.keys(query).length > 0) {
    return `?${qs.stringify(query)}`;
  }

  return '';
};

const buildUrl = req => {
  const url = `${req.url}${req.uri}${getUrlQuery(req)}`;
  return Object.keys(req.params)
    .reduce((parsedUrl, param) => parsedUrl.replace(`:${param}`, req.params[param]), url);
};

export const send = req =>
  fetch(buildUrl(req), {
    method: req.method,
    headers: req.headers,
    body: req.body,
    search: req.query,
  })
  .then(response => response.json());
