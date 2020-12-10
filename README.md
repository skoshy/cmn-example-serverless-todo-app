# boilerplate-nextjs

![Build and deploy badge](https://github.com/skoshy/boilerplate-nextjs/workflows/Build%20and%20deploy/badge.svg?branch=master)

Boilerplate for Next.js projects, made by **[@skoshy](https://github.com/skoshy)**

See it here: https://boilerplate-nextjs.netlify.com/

Features:

- ⚛️ **[React](https://reactjs.org/)** with **[Next.js](https://nextjs.org/)**
- 🔷 **[TypeScript](https://www.typescriptlang.org/)** fully supported
- 💅 **[styled-components](https://www.styled-components.com/)** and **[SASS](https://sass-lang.com/)** (global styles and **[css modules](https://github.com/css-modules/css-modules)** with automatic types); **[Grommet](https://github.com/grommet/grommet)** serves as the underlying component library
- 🏃‍♂️ **[Gulp](https://gulpjs.com/)** for task-running
- ✅ **[ESLint](https://eslint.org/)** with **[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)** and various plugins and **[Prettier](https://prettier.io/)** for code-styling
- 🃏 **[Jest](https://jestjs.io/)** for testing
- 💻 Full **cross-platform** support between macOS/Linux/Windows

## Table of Contents

- [Building / Running](#build)
- [Stack / Packages / Tools](#stack)
- [Definitions](#definitions)
- [Deployment](#deployment)

<a name="build"></a>

## Building / Running

Currently Node 12 is required.

- It's recommended to install/use [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) to manage/switch your node versions.

```bash
# 1a) [macOS/Linux] If you have nvm installed, run:
nvm install

# 1b) [Windows] If you have nvm-windows installed, run in PowerShell:
.\scripts\install-nvm.ps1

# 2)  Then, it's pretty simple
yarn install
yarn dev
```

<a name="stack"></a>

## Stack

### Tools

- **`node >= 12`** - No real reason to use Node 12 as the minimum version, but it's currently LTS so why not
- **`nvm/nvm-windows`** - Useful for managing multiple node versions between projects
- **`yarn`** - I personally like yarn more than `npm`. Syntax is cleaner, installing is faster, overall is just pleasant.

### File structure

For SCSS files, you can use `*.module.scss` files for CSS modules, or `*.scss` for global stylesheets.

- **`.env.example`** - Example environment variable file, automatically gets used as default `.env`
- **`.npmrc`** - Ensure we use exact versions when adding things to `package.json`
- **`.nvmrc`** - Define the recommended node version

### Dependencies

- **`autoprefixer`** - Peer dependency of Tailwind
- **`lodash`** - Helper functions for common JS problems
- **`next`** - Meta-framework
- **`next-on-netlify`** - Adds full support for Next on Netlify, including SSR. See [next-on-netlify](https://github.com/netlify/next-on-netlify)
- **`postinstall-postinstall`** - Runs `postinstall` scripts on script removal as well. See [`postinstall-postinstall`](https://www.npmjs.com/package/postinstall-postinstall) or [`patch-package`](https://www.npmjs.com/package/patch-package) for more info
- **`postcss`** - Peer dependency of Tailwind
- **`postcss-flexbugs-fixes/postcss-preset-env`** - We need to manually include these since we override Next's default PostCSS config
- **`react`/`react-dom`** - ⚛️
- **`react-modal`** - Accessibility friendly modal, styled by our component library
- **`sass`** - needed for SASS support in Next
- **`styled-components`** - robust CSS-in-JS solution
- **`utility-types`** - Has a lot of helper functions and utils for TypeScript

### Dev Dependencies

- **`@babel/register`** - For using Babel with Gulp
- **`@types/react`/`@types/node`** - Required by Next.js to be installed when using TypeScript
- **`env-cmd`** - Passes `.env` environment variables easily to scripts, cross-platform
- **`eslint`** - Linter
- **`gulp`** - Task runner, used to automate tasks on run/build
- **`npm-run`** - Run locally installed `npm` packages within scripts
- **`prettier`** - Make code look nice automatically
- **`shelljs`** - Cross-platform Unix commands that can be used in scripts
- **`typescript`** - Types are 👍

<a name="definitions"></a>

## Definitions

- `lib` vs `helpers`

  - `lib` refers to anything that isn't specifically tied to a project. Basically, the function/constant/whatever could be pulled out and made its own separate npm package if need be.
  - `helpers` refers to things that are specifically tied to the project in some way.
  - For example, if you have a `generateRandomHexColor` function, it's pretty generic and not tied specifically to the project, so it'd go in _lib_.

    If you have a `convertDateToApiFormat` function, it's tied to the project specifically, so it'd go in _helpers_.

  These same rules apply to `_lib_` and `_helpers_` components in the `components` folder.

  - `_lib_` - components that are very generic and aren't tied to functionality in the app itself
  - `_helpers_` - shared components throughout app only relevant in this project
  - `_pages_` - these are components specifically tied to a page / set of pages in the app

<a name="#deployment"></a>

## Deployment

The repo comes baked with Github actions support that'll automatically deploy your site to Netlify for you.

Here's what you have to do to enable this:

- Login to [Netlify](https://netlify.com)
- Add your repo as a site to Netlify
- Configure the build/publish details
  - Build command: `gulp build`
  - Publish directory: `out/`
- Set your production branch to `auto-netlify` (not sure if this is necessary, but just in case)
- Now go to your [user settings in Netlify](https://app.netlify.com/user/applications) and generate a personal token. Name it something related to the project you're making and copy the token.
- In your Github repo, first enable Github actions for your repo
- Then in your Github repo, add a new secret with name `NETLIFY_AUTH_TOKEN`. The URL to do this is https://github.com/skoshy/boilerplate-nextjs/settings/secrets/new - substitute your username and repo.
- In Netlify, find your site's API ID (try checking https://app.netlify.com/sites/boilerplate-nextjs/settings/general, substitute appropriately). You must put this as a secret in Github like above with name `NETLIFY_SITE_ID`.
- That should be it! Now every time your code is pushed to master, it should auto-deploy to Netlify!
