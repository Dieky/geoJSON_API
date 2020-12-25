## first thing you should do is to create af file `.env` in the root of the project with this content

CONNECTION=YOUR_CONNECTION_STRING_TO_ATLAS

DB_NAME=semester_case

PORT=5555

DEBUG=game-project,facade-no-db,facade-with-db,facade-with-db:test,user-endpoint,user-endpoint-test,db-setup

# Comment out, or remove, this line to get authentication
# SKIP_AUTHENTICATION=xxxx

MOCHA_TIMEOUT=5000

## HINTS

Remember you can run individual typescript files using ts-node like this:
`ts-node -r dotenv/config ./src/PATH_TO_FILE`

Send post request to localhost:5555/api/users/nearbyplayers/     OR   online https://deletemeaftertest.dieky.dk/api/users/nearbyplayers

with this body

{
    "username": "dieky",
    "password": "test",
    "lat":55.78,
    "lon":12.48,
    "radius":5000
}
