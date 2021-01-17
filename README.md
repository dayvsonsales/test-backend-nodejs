# Backend Analyst Candidate Testing

This is a simple micro-service of products management system which uses MongoDB as main database.

**User stories:**

    As a user I would like to register a product so that I can have access to the data of this product in the future (Title, description, price, category)
    As a user I would like to be able to associate and edit a product category;
    As a user I would like to be able to access the list of all products;
    As a user I would like to be able to filter products by name or category;
    As a user I would like to be able to update the product data;
    As a user I would like to be able to delete a product from my catalog;

## Usage

There are two ways to run the project. The fastest is using docker:

Run `docker-compose up --build` and it'll run the application on port 3333 and the MongoDB database on port 27017.

Or you can run it locally:

1. Install dependencies: `npm install`
2. Make sure to have a MongoDB instance running in your machine
3. Create a .env file following .env.example
4. Run project using `npm run start`

## Tests

You can run the tests with `npm run test` command. It uses the Jest library.

## The project

This project is based on a micro-service architecture with a clean architecture-based. The project is structured as below:

```
src
  - config (configuration files)
  - errors (errors handlers)
  - infra (implementation of database and use of express and controller pattern)
  - logger (log handlers)
  - services
tests (unit tests)

```

## Technologies

- Express
- Mongoose
- Log4js
- Jest
- Yup
- PM2
- Docker
- Helmet

## Routes

**Find all products**

```
GET /products
```

**Shows a single product with a given id**

```
GET /products/:id
```

**Create a product using a given JSON with { title, description, categories, price }**

```
POST /products
```

All fields are required and categories is not an array, instead is a string with categories separated by commas.

Example:

```javascript
{
	"title": "Redmi Note 8",
	"description": "A good smartphone",
	"price": 800,
	"categories": "smartphone,newgeneration"
}
```

**Updates a product**

```
PUT /products/:id
```

Pass a JSON body. Example:

```javascript
{
	"title": "Xiaomi Redmi Note 8",
  "description": "Celular",
  "price": 1200
}
```

**Delete a product with a given id**

```
DELETE /products/:id
```

**Associate a single category to a product**

```
POST /products/associate/:id
```

Pass a JSON body containing a field category. Example:

```javascript
{
  "category": "smartphone"
}
```

**Find products by a title or category**

```
GET /products?query={category,title}

```

Example:

`GET /products?query=Celular`

Or

`GET /products?query=smartphone,redmi`

This query is case insensitive. You can search for more than one category, using commas between categories.

**Possible Status Code**

- HTTP 200 - Everything worked like a charm
- HTTP 400 - Bad request (a request validation failed; a message with details is given)
- HTTP 404 - A product could not be found (a not found message is given)
- HTTP 500 - Something went wrong (a internal server error is given to user)

## Project Decisions

- I chose to not put a cache in queries. The queries used in this simple app is too simple and a cache here would be to overkill and just to show that I know how to use cache (and maybe the find methods in MongoDB were be useless), so even I implemented a Redis cache provider, I decided to not use it.

- I decided to use embedded documents instead of referencing due to the time that I had to complete the challenge (I have no examples of this in my machine to lookup)

- I decided to use csv-like to insert categories because it was easier to query

- I'm not too comfortable with MongoDB (the last time I used it was 2015, so a long time). But I still remember something, so I decided to use it even being a complete noob at this time.
