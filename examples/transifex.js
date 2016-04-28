import { rekuest, method, headers, url, uri, params, query, body } from './src/index';

const tfxRequest = rekuest(
  url('https://www.transifex.com/api/2')
);

/**
 * Projecs
 */
const projectRequest = tfxRequest(
  uri('/project/:project'),
);

const projectsRequest = tfxRequest(
  uri('/projects')
);

export const getProjects = () => tfxRequest(uri('/projects'))();

export const createProject = data => projectsRequest(method('post'), body(data))();

export const getProject = project => projectRequest(params({ project }))();

export const updateProject = (project, data) => projectRequest(
  method('put'),
  params({ project }),
  body(data)
)();

export const deleteProject = project => projectRequest(
  method('delete'),
  params({ project })
)();

/**
 * Resources
 */
const resourceRequest = projectRequest(
  uri('/resource/:resource'),
);

export const getResources = project => projectRequest(uri('/resources'), params({ project }))();

export const getResource = (project, resource) => resourceRequest(params({ project, resource }))();

export const updateResource = (project, resource, data) => resourceRequest(
  method('put'),
  params({ project, resource }),
  body(data)
)();

export const deleteResource = (project, resource) => resourceRequest(
  method('delete'),
  params({ project, resource })
)();

/**
 * Resource content
 */
const contentRequest = resourceRequest(uri('/content'));

export const getResourceContent = (project, resource) => contentRequest(params({ project, resource }))();

export const updateResourceContent = (project, resource, content) => contentRequest(
  method('put'),
  params({ project, resource }),
  body({ content })
)();

/**
 * Translations
 */
const translationRequest = resourceRequest(uri('/translation/:langCode'));
f
export const getTranslations = (project, resource, langCode) => translationRequest(
  params({ project, resource, langCode })
)();

export const updateTranslations = (project, resource, langCode, translations) => translationRequest(
  method('put'),
  params({ project, resource, langCode }),
  body(translations)
)();

/**
 * Translation strings
 */
const stringsRequest = translationRequest(uri('/strings'));

export const getTranslationStrings = (project, resource, langCode) => stringsRequest(
  params({ project, resource, langCode })
)();

export const updateTranslationStrings = (project, resource, langCode, data) => stringsRequest(
  method('put'),
  params({ project, resource, langCode }),
  body(data)
)();
