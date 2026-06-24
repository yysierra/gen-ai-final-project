# Final Project

# Cartographer's Index

This is full-stack web application serving as an interactive geographic and demographic data lookup tool. 

## Features

Some features I've developed:
- Geographical Data retrieval: Real time statistics (captial, population, region, languages) based on user queries via an external REST API.
- Server-Side Protection (Routes): Middleware was implemented to ensure authenticated users with valid sessions to access the API tools.
- Error Handling: Invalid queries were taken care of. I also ensured that formatted HTML responses were to sent back to client-side perspective.

## API Interaction
Initially this project utilized one of the many free models from Google's Gemini API, however, due to high spikes and demand, I decided it was best to move over to a much simplier API. the [**REST Countries API**](https://restcountries.com/) was used to populate some geographic data.


# Running the Server (for local use)
### 1. **Install Dependencies**
Browse to the project root directory and install the essential Node modules:

``` {Bash}
npm install 
```

### 2. **Configure Environment Variables**
Create a `.env` file in the root directory. You'll have to provide an API Key and database credentials:

``` Bash
    PORT = 3000
    SESSION_SECRET=your_secure_session_secret
    COUNTRIES_API_KEY=your_rest_countries_api_key
    MONGODB_URI=your_mongo_db_uri_key
```

### 3. **Run the Server**
By default, you can start the server in development mode using [nodemon](https://www.npmjs.com/package/nodemon), allowing to automatically restart on file changes:

``` Bash
nodemon server app.js
```

Alternatively, you can place the following script in your `packages.json` file:

``` json
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
```

Then execute by running the following command:

``` Bash
    npm run dev
```

### 4. **Access the application**
Once running, navigate to `http://localhost:3000/` on you favorite browser.
