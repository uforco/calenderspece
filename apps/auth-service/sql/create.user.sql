WITH
    new_email AS (
        INSERT INTO
            emails (email)
        VALUES ($4)
        ON CONFLICT (email) DO NOTHING
        RETURNING
            email
    ),
    new_user AS (
        INSERT INTO
            users (username, provider, password)
        SELECT $1, $2, $3
        FROM new_email
        RETURNING
            *
    ),
    update_email AS (
        UPDATE emails
        SET
            user_id = new_user.id
        FROM new_user
        WHERE
            emails.email = $4
        RETURNING
            emails.*
    )
SELECT *
FROM new_user
    LEFT JOIN update_email ON new_user.id = update_email.user_id;