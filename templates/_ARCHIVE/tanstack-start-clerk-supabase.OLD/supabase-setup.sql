  -- Supabase SQL setup script for the tanstack-start-clerk-supabase project
  -- This script creates all the necessary tables and permissions

  -- Posts Table
  CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Notes Table
  CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Todos Table
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    user_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Row Level Security (RLS) Policies
  -- Enable RLS on all tables
  ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
  ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
  ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

  -- Policy for posts - users can only see their own posts
  CREATE POLICY posts_select_policy ON posts
    FOR SELECT USING (auth.uid()::text = user_id);

  CREATE POLICY posts_insert_policy ON posts
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

  CREATE POLICY posts_update_policy ON posts
    FOR UPDATE USING (auth.uid()::text = user_id);

  CREATE POLICY posts_delete_policy ON posts
    FOR DELETE USING (auth.uid()::text = user_id);

  -- Policy for notes - users can only see their own notes
  CREATE POLICY notes_select_policy ON notes
    FOR SELECT USING (auth.uid()::text = user_id);

  CREATE POLICY notes_insert_policy ON notes
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

  CREATE POLICY notes_update_policy ON notes
    FOR UPDATE USING (auth.uid()::text = user_id);

  CREATE POLICY notes_delete_policy ON notes
    FOR DELETE USING (auth.uid()::text = user_id);

  -- Policy for todos - users can only see their own todos
  CREATE POLICY todos_select_policy ON todos
    FOR SELECT USING (auth.uid()::text = user_id);

  CREATE POLICY todos_insert_policy ON todos
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

  CREATE POLICY todos_update_policy ON todos
    FOR UPDATE USING (auth.uid()::text = user_id);

  CREATE POLICY todos_delete_policy ON todos
    FOR DELETE USING (auth.uid()::text = user_id);

  -- Create indexes for better performance
  CREATE INDEX IF NOT EXISTS posts_user_id_idx ON posts (user_id);
  CREATE INDEX IF NOT EXISTS notes_user_id_idx ON notes (user_id);
  CREATE INDEX IF NOT EXISTS todos_user_id_idx ON todos (user_id);





















  