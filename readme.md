----
cURL to get available racks

curl --location --request POST '127.0.0.1:3000/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "qty": 200,
    "sku": "ABC123"
}'

------
cURL to save stock in racks
curl --location --request POST '127.0.0.1:3000/save-stock' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "rack": 1,
        "qty": 68,
        "sku": "ABC123"
    },
    {
        "rack": 3,
        "qty": 100,
        "sku": "ABC123"
    },
    {
        "rack": 4,
        "qty": 32,
        "sku": "ABC123"
    }
]'