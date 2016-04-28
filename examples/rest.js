import { rekuest, method, headers, url, uri, params, query, body } from '../src';

const api = rekuest(
  url('http://api.examples.com'),
  headers({ 'Content-Type': 'x-www-url-encoded' })
);

const get = api(method('get'));
const post = api(method('get'));
const put = api(method('get'));
const del = api(method('get'));

const resource = name => {
  return {
    list: () => get(uri(`/${name}`))(),

    get: id => get(uri(`/${name}/:id`), params({ id }))(),

    create: data => post(uri(`/${name}`), body(data))(),

    update: (id, data) => put(uri(`/${name}/:id`), params({ id }), body(data))(),

    remove: id => del(uri(`/${name}/:id`), params({ id }))(),
  };
};

const articles = resource('articles');

articles.list().then(/* ... */);
articles.get(138).then(/* ... */);
articles.create({ title: 'My article' }).then(/* ... */);
articles.update(138, { title: 'Updated title' }).then(/* ... */);
articles.remove(138).then(/* ... */);
