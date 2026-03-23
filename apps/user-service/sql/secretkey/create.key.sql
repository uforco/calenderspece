INSERT INTO
    secretkey (name, user_id, secret_key)
VALUES ($1, $2, $3)
RETURNING
    *