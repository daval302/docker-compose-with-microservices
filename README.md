# Sample infrastructure within docker

Generate user actions, such as select item from a repository (data-api connected to a database), add to checkouts, 
pay item and emulate successful/unsuccessful payments.

## What is the goal

Integrate kafka between more REST APIs to simulate node downtime, making the overall system fault-tolerant.

## Requirements

* docker
* docker-compose

## Build/Run

```bash
docker-compose build
docker-compose up
```
Start generating user actions in the React app on `http:localhost:3000`
Note: look at javascript console logs to see interactions with **payment-api** and **data-api**

DONE !!

Once you fed up of it, just run

```bash
docker-compose down
```

### NOTE
For debugging purpose, use the following to run the databse

```
docker run  --env MYSQL_ROOT_PASSWORD=pass -v $PWD/init:/docker-entrypoint-initdb.d -p 3306:3306 mysql
```
