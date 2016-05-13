import { rekuest, method, headers, url, uri, params, query, body } from '../src';

const api = rekuest(
  url('http://api.examples.com'),
  headers({ 'Content-Type': 'x-www-url-encoded' })
);

const get = api(method('get'));
const post = api(method('get'));
const put = api(method('get'));
const del = api(method('get'));

const list = resource => _ => 
  get(uri(`/${resource}`))();

const get = resource => id => 
  get(uri(`/${resource}/:id`), params({ id }))();

const create = resource => data => 
  post(uri(`/${resource}`), body(data))();

const update = resource => id => 
  data => put(uri(`/${resource}/:id`), params({ id }), body(data))();

const remove = resource => id => 
  del(uri(`/${resource}/:id`), params({ id }))();

const articles = 'articles';

list(articles).then(/* ... */);
get(articles)(138).then(/* ... */);
create(articles)({ title: 'My article' }).then(/* ... */);
update(atricles)(138)({ title: 'Updated title' }).then(/* ... */);
remove(articles)(138).then(/* ... */);
