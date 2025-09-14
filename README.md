# Q-Archive

## Getting Started

#### 1. Clone and install project

```
git clone https://github.com/PrjctQ/Q-Archive.git
cd Q-Archive
```

#### 2. Set up envrionment variables from `.env.example`

```
cp .env.example .env.local
```

3. Sync supabase database

- Login to supabase

```
pnpm supabase login
```

- Link project (replace `project_id` with your project id)

```
pnpm supabase link --project-ref <project_id>
```

- Push migration to remote database

```
pnpm supabase db push
```

#### 3. Start development server

```
pnpm dev
```
