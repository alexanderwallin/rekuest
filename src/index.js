import flow from 'lodash.flow';
import isFunction from 'lodash.isfunction';

import { send } from './http';

const defaults = {
  method: 'get',
  headers: {},
  url: '',
  uri: '',
  params: {},
  query: {},
  body: {},
  debug: false,
};

const rekuest = (req, ...alts) => {
  if (isFunction(req)) {
    alts.unshift(req);
    req = { ...defaults };
  }

  if (!req) {
    return rekuest(defaults);
  }

  if (alts.length) {
    const alteration = flow(alts);
    return rekuest(alteration(req));
  }

  return (...nextAlts) => {
    if (nextAlts.length) {
      const alteration = flow(nextAlts);
      return rekuest(alteration(req));
    }

    return send(req);
  };
};

export default rekuest;
export { rekuest };

export const method = m => req => ({ ...req, method: m });

export const headers = h => req => ({ ...req, headers: { ...req.headers, ...h } });

export const url = u => req => ({ ...req, url: u });

export const uri = u => req => ({ ...req, uri: `${req.uri}${u}` });

export const params = p => req => ({ ...req, params: { ...params, ...p } });

export const query = q => req => ({ ...req, query: { ...req.query, ...q } });

export const body = b => req => ({ ...req, body: { ...body, ...b } });

export const debug = d => req => ({ ...req, debug: d });
