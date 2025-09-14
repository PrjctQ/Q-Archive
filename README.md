# Q-Archive

## Getting Started

#### 1. Clone and install project

```
git clone https://github.com/PrjctQ/Q-Archive.git
cd Q-Archive && pnpm i
```

#### 2. copy `.env.example` and replace with your environment variable values
```
cp .env.example .env.local
```

#### 3. Sync supabase database

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

#### 4. Start development server

```
pnpm dev
```
