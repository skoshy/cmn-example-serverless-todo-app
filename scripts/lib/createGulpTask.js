/**
 * Allows adding information to a gulp task for the automatic
 * `yarn start` task to show.
 *
 * @param  {...any} args - [1 param] => `createGulpTask(gulpFunc)`. [2 params] `createGulpTask(options: { description: string }, gulpFunc)`
 */
export const createGulpTask = (...args) => {
  const params = {
    gulpFunc: undefined,
    options: {},
  };

  if (args.length === 1) params.gulpFunc = args[0];
  else {
    params.options = args[0];
    params.gulpFunc = args[1];
  }

  params.gulpFunc.description = params.options.description;

  return params.gulpFunc;
};
