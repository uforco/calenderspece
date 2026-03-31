INSERT INTO
    secretkey (
        secretkeyName,
        user_id,
        secretkeyValue
    )
VALUES ($1, $2, $3)
RETURNING
    *