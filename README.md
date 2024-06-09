
# Movie Management

Backend application that will serve as the foundation for our movie database

https://movie-management-2dpn.onrender.com

## Tech Stack

Nest.JS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

TypeScript: Bringing the benefits of strong typing and modern JavaScript features to our backend development.

PostgreSQL (Neon) : A robust and reliable relational database management system, ensuring data integrity and performance.

TypeORM: A versatile ORM that simplifies database interactions and streamlines development with TypeScript support.

Hexagonal Architecture Pattern: Structuring our application in a modular and maintainable way, promoting separation of concerns and testability.
## API Reference

#### Get all movies

```http
  GET /movies
```

#### Get movie with id

```http
  GET /movies/{id}
```

#### sort Movies

```http
  GET /movies?sort=sorting_key:sorting_direction

  valid sorting_key - ["rating"]
  valid sorting_direction - ["asc", "desc"]

  example: /movies?sort=rating:desc
```

#### filter movies by genre

```http
  GET /movies?genre=romance
```

#### Rate Movie

```http
  POST /movies/{id}/rate

  payload: {
    rating: 1
  }

  constraints - 
  rating range - [0, 5]
```

```http
  POST /movies/create

  payload: {
        "title": "Valentine's Day",
        "release_data": "2014-01-01",
        "description": "Lorem ipsum dolor sit"
        "genre": "comedy"
    }
```

## Run Local

```bash
  npm run start:dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` (https://neon.tech/)

