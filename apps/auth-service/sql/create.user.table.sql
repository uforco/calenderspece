CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4 (),
    username VARCHAR(100) NOT NULL,
    provider auth_provider DEFAULT 'credentials',
    varify BOOLEAN DEFAULT FALSE,
    password VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP
);