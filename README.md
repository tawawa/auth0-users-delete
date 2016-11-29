### User Deletion

### Installation

You need an up-to-date (recent) version of NodeJs and NPM installed.

```
git clone git@github.com:tawawa/auth0-users-delete.git
cd auth0-users-delete
npm install
```

#### Mangement Token Setup

Go to the [Management API](https://auth0.com/docs/api/management/v2) and ensure you have a token with the following scopes:

```
"scopes": {
    "users": {
      "actions": [
        "delete",
        "read"
      ]
    },
    "user_idp_tokens": {
      "actions": [
        "read"
      ]
    }
  }
  ```

  Create a `.env` file in base of the project with following keys (with values for demo purposes);

  ```
  MANAGEMENT_TOKEN=<YOUR TOKEN>
# V2_ENDPOINT_URL=https://arcseldon.auth0.com/api/v2/
V2_ENDPOINT_URL=http://localhost:3001
```

See `package.json` for available scripts. It is possible to create mock data, run a mock api server and test the script too.

```
  "lint": "eslint index.js",
  "lint:watch": "npm run lint -- --watch",
  "start": "node index.js",
  "generate-mock-data": "node ./buildScripts/generateMockData.js",
  "prestart-mockapi": "npm run generate-mock-data",
  "start-mockapi": "json-server --watch api/db.json --port 3001
```

#### Run

Just use (from the base of the project):

`npm start`

equivalent to:

`node index.js`
