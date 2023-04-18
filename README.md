<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">


<h3 align="center">PRODUCT-STORE-NEST.JS</h3>

  <p align="center">
   Nest.js product store API, made with typescript
   
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#Roles-and-permissions">Roles and permissions</a></li>
    <li><a href="#Additional-feature-description">Additional feature description</a></li>
    <li><a href="#business-rules">Business rules</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#Todo">Todo</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
  Nest.js application that mock product store backend. It enable users with admin roles to add product details (price, category etc.) and registred and authenticated user to create orders for given products. Further actions are based on metioned roles and permissions.  Passport.js is used as middleware and mySQL as primary databsase. 

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

* [Nest.js](https://docs.nestjs.com/)
* [Typescript](https://www.typescriptlang.org/docs/)
* [MySQL](https://dev.mysql.com/doc/)
* [Redis](https://redis.io/docs/)
* [Docker](https://docs.docker.com/)
* [Passport.js](https://www.passportjs.org/)
* [TLS](https://docs.oracle.com/javase/8/docs/technotes/guides/security/jsse/tls.html)
* [Typeorm](https://typeorm.io/)
* [Class validator](https://www.npmjs.com/package/@nestjs/class-validator/v/0.13.1)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)

<p align="right">(<a href="#top">back to top</a>)</p>


## Roles and permissions
### Client can
- register an account (need to provide name, login, password and email)
- login to account
- make an order
- change order status
- list own orders
- get product list 


### Admin can (besides all client and permissions) can:
- add / update products
- add / update categories
- list all clients
- list all orders

<p align="right">(<a href="#top">back to top</a>)</p>


## Business rules
- Orders can only be made for client 
- login and email cannot be duplicated
- password must
- not available product cannot be ordered
- already completed order cannot change status

<p align="right">(<a href="#top">back to top</a>)</p>

## Endpoints


### Client register
```
POST http://localhost:4000/auth/register
Content-Type: application/json

{
    "login": "login123",
    "password": "$tr0ng_P4$$w0rd",
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com" 
}

RESPONSE: HTTP 201 (Created)
{
    "message": "User created successfully"
}

```

### Login

```
POST http://localhost:4000/auth/login
Content-Type: application/json

{
    "login": "login123",
    "password": "$tr0ng_P4$$w0rd"
}

RESPONSE: HTTP 200
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... rest of client JWT",
    "method": "Bearer"
}
```

### Add new product (as a admin)

```
POST http://localhost:4000/products
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... rest of admin JWT

{
    "name": "Odyssey",
    "description": "Homer Odyssey book",
    "price": 20,
    "categoryName": "BOOK"
}

RESPONSE: HTTP 201 (Created)
{
    "name": "Odyssey",
    "description": "Homer Odyssey book",
    "price": 20,
    "category": {
        "id": 6,
        "categoryName": "BOOK"
    },
    "id": 13,
    "isAvailable": true
}
```

### Get all products
```
GET http://localhost:4000/products
(no auth required)

[
    {
        "id": 1,
        "name": "Creatine lemon 120g",
        "isAvailable": true,
        "description": "Creatine is a natural substance found in the body. It is produced in the liver, kidneys and pancreas. It is also found in red meat and fish. Creatine is stored in the muscles in the form of phosphocreatine.",
        "price": 20,
        "category": {
            "id": 1,
            "categoryName": "SPORT"
        }
    },
    {
        "id": 2,
        "name": "Nike Air Max 270",
        "isAvailable": true,
        "description": "Nike Air Max 270 is a new silhouette from Nike. It is a combination of the Air Max 180 and Air Max 93. The shoe features a full-length Air unit, a mesh upper, and a synthetic heel counter.",
        "price": 200,
        "category": {
            "id": 2,
            "categoryName": "CLOTHES"
        }
    },
    {
        "id": 3,
        "name": "iPhone 6s",
        "isAvailable": true,
        "description": "iPhone 6s is a smartphone designed, developed, and marketed by Apple Inc. It is the tenth generation of the iPhone.",
        "price": 500,
        "category": {
            "id": 3,
            "categoryName": "ELECTRONIC"
        }
    },
    {
        "id": 4,
        "name": "T-shirt",
        "isAvailable": true,
        "description": "A T-shirt is a style of unisex fabric shirt named after the T shape of its body and sleeves.",
        "price": 20,
        "category": {
            "id": 2,
            "categoryName": "CLOTHES"
        }
    },
  other results...
```

### Add new order

```
POST http://localhost:4000/orders
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... rest of client JWT

{
    "ProductsIds": [
        1, 4
    ]
}

RESPONSE: HTTP 201 (Created)
{
    "message": "Order created"
}
```

### Of course there is also exception handling for unauthorized/unauthenticated/incorrect data, for example

### Client try to get other users info

```
GET http://localhost:4000/users
Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.... rest of user JWT

RESPONSE: HTTP 401
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```

### Missing field when adding new product

```
POST http://localhost:4000/products
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9... rest of admin JWT

{
    "name": "Odyssey",
    "description": "Homer Odyssey book",
    "categoryName": "BOOK"
}

RESPONSE: HTTP 400
{
    "statusCode": 400,
    "message": [
        "price must be a positive number"
    ],
    "error": "Bad Request"
}
```

### Product is not available

```
POST http://localhost:4000/orders
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9... rest of client JWT
{
    "ProductsIds": [
        1, 4
    ]
}

RESPONSE: HTTP 400
{
    "statusCode": 400,
    "message": "Product is not available",
    "error": "Bad Request"
}
```



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/pStrachota/LIBRARY-JAKARTA-EE-PROJECT.svg?style=for-the-badge
[contributors-url]: https://github.com/pStrachota/LIBRARY-JAKARTA-EE-PROJECT/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/pStrachota/LIBRARY-JAKARTA-EE-PROJECT.svg?style=for-the-badge
[forks-url]: https://github.com/pStrachota/LIBRARY-JAKARTA-EE-PROJECT/network/members
[stars-shield]: https://img.shields.io/github/stars/pStrachota/LIBRARY-JAKARTA-EE-PROJECT.svg?style=for-the-badge
[stars-url]: https://github.com/pStrachota/LIBRARY-JAKARTA-EE-PROJECT/stargazers
[issues-shield]: https://img.shields.io/github/issues/pStrachota/LIBRARY-JAKARTA-EE-PROJECT.svg?style=for-the-badge
[issues-url]: https://github.com/pStrachota/LIBRARY-JAKARTA-EE-PROJECT/issues
[license-shield]: https://img.shields.io/github/license/pStrachota/LIBRARY-JAKARTA-EE-PROJECT.svg?style=for-the-badge
[license-url]: https://github.com/pStrachota/LIBRARY-JAKARTA-EE-PROJECT/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png



