import 'isomorphic-fetch';
import qs from 'qs';

const buildUrl = req => {
  const url = [req.url, req.uri, Object.keys(req.query).length ? `?${qs.stringify(req.query)}` : null].join('');
  return Object.keys(req.params)
    .reduce((parsedUrl, param) => parsedUrl.replace(`:${param}`, req.params[param]), url);
};

export const send = req => {
  return fetch(buildUrl(req), {
      method: req.method,
      headers: req.headers,
      body: req.body,
      search: req.query,
    })
    .then(response => response.json());

  // console.log('- - - - -\nfetch:');
  // console.log(`[${req.method.toUpperCase()}]`, buildUrl(req));
  // console.log('  body:    ', JSON.stringify(req.body));
  // console.log('  headers: ', JSON.stringify(req.headers));
  // console.log();
};
