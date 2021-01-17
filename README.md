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

```
GET /products - list all products
```

```
GET /products/:id - shows a single product with a given id
```

```
POST /products - create a product using a given JSON with { title, description, categories, price }

All fields are required and categories is not an array, instead is a string with categories separated by commas.

Example:

{
	"title": "Redmi Note 8",
	"description": "A good smartphone",
	"price": 800,
	"categories": "smartphone,newgeneration"
}

```

```
PUT /products/:id - updates a product

Pass a JSON body. Example:

{
	"title": "Xiaomi Redmi Note 8",
  "description": "Celular",
  "price": 1200
}

```

```
DELETE /products/:id - delete a product with a given id
```

```
POST /products/associate/:id - associate a single category to a product

Pass a JSON body containing a field category. Example:

{
  "category": "smartphone"
}

```

```
GET /products?query={category,title} - find products by a title or category

Example:

GET /products?query=Celular

Or

GET /products?query=smartphone,redmi

This query is case insensitive. You can search for more than one category, using commas between categories.
```
