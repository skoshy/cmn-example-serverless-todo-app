# cmn-example-serverless-todo-app

Table creation script in Supabase

```sql
create table todos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid references auth.users not null,
  task text,
  is_complete boolean default false,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table todos enable row level security;

create policy "Individuals can create todos." on todos for
    insert with check (auth.uid() = user_id);

create policy "Individuals can view their own todos. " on todos for
    select using (auth.uid() = user_id);

create policy "Individuals can update their own todos." on todos for
    update using (auth.uid() = user_id);

create policy "Individuals can delete their own todos." on todos for
    delete using (auth.uid() = user_id);
```

## Table of Contents

- [Building / Running](#build)
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
- Then in your Github repo, add a new secret with name `NETLIFY_AUTH_TOKEN`. The URL to do this is https://github.com/skoshy/cmn-example-serverless-todo-app/settings/secrets/new - substitute your username and repo.
- In Netlify, find your site's API ID (try checking https://app.netlify.com/sites/cmn-example-serverless-todo-app/settings/general, substitute appropriately). You must put this as a secret in Github like above with name `NETLIFY_SITE_ID`.
- That should be it! Now every time your code is pushed to master, it should auto-deploy to Netlify!

