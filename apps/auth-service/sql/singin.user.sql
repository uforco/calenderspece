SELECT email, u.*
FROM emails c
    JOIN users u ON c.user_id = u.id
WHERE
    c.email = $1