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
Start generating user actions using the React app on `http://localhost:3000`
Note: look at javascript console logs to see interactions with **payment-api** and **data-api**

DONE !!

Once you fed up of it, just run

```bash
docker-compose down
```

Note: if you stop containers drastically as CTRL+C it would probably have DB unchanged next time you bring everything up again.

### Utility

If you do not want to run the full compositions of container and see changes straight away without building again all the images,  you can run the following database container, change the `application.yml` file accordly for the right datasource (localhost), ports and run separately the APIs.

```
docker run  --env MYSQL_ROOT_PASSWORD=pass -v $PWD/init:/docker-entrypoint-initdb.d -p 3306:3306 mysql
```
