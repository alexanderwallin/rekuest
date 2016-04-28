# rekuest

A functional style HTTP request composer, heavily inspired by the [kewler](https://github.com/adriantoine/kewler) color manipulation module.

`rekuest` lets you compose HTTP request endlessly until you invoke a `rekuest` object without any arguments.

```js
import { rekuest, method, url, uri, body, params } from 'rekuest'

const apiRequest = rekuest(url('http://api.com'))
const userUpdateRequest = apiRequest(uri('/users/:id'), method('put'))
const dryUserUpdateRequest = userUpdateRequest(body({ dry: 'sure-thing' }))
const dryUserUpdateRequestWithData = dryUserUpdateRequest(
  body(userData),
  params({ id: someUserId })
)

// It feels like we are ready to make the request.
dryUserUpdateRequestWithData().then(/* handle response */)
```

### Examples

*Note: We are largely omitting import of `rekuest` methods*

Create a base request modifier, which we will use in the succeeding examples:

```js
import { rekuest, url } from 'rekuest'

export const api = rekuest(url('http://my.api.com'))
```

Fetch some articles:

```js
const getArticles = api(uri('/articles'))
getArticles().then(/* do stuff */)
```

Update a user:

```js
const updateUser = api(
  uri('/users/:id'),
  params({ id: someUserId }),
  body({ name: 'Boop' })
)

updateUser().then(/* ... */)
```

Make some handy request helpers:

```js
const get = api(method('get'))
const put = api(method('put'))
const post = api(method('post'), headers({ 'Content-Type': 'multipart/form-data' }))
const del = api(method('delete'))
```

Go nuts and make an API resource factory:

```js
const resource = (name) => {
  return {
    list: () => get(uri(`/${name}`))(),
    get: (id) => get(uri(`/${name}/:id`), params({ id }))(),
    create: (data) => post(uri(`/${name}`), body(data))(),
    update: (id, data) => put(uri(`/${name}/:id`), params({ id }), body(data))(),
    remove: (id) => del(uri(`/${name}/:id`), params({ id }))(),
  }
}

// Later on...
const articles = resource('articles')

articles.list().then(response => console.log(response))
articles.get(421).then(/* ... */)
articles.create({ title: 'My article' }).then(/* ... */)
articles.update(421, { title: 'My improved article' }).then(/* ... */)
articles.remove(421).then(/* ... */)
```

