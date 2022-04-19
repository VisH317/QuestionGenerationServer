CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY,
    names TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    profile_pic TEXT NOT NULL
);