WITH
    new_user AS (
        INSERT INTO
            users (username, provider, password)
        VALUES ($1, $2, $3)
        RETURNING
            *
    ),
    new_email AS (
        INSERT INTO
            emails (user_id, email)
        SELECT new_user.id, $4
        FROM new_user
        RETURNING
            *
    )
SELECT email, new_user.*
FROM new_email
    LEFT JOIN new_user ON new_user.id = new_email.user_id