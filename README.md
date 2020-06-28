# Sample infrastructure within docker

## Requirements

* docker
* docker-compose

## Build/Run

```aidl
docker-compose build
docker-compose up
```

DONE !!

Once you fed up of it, just run

```aidl
docker-compose down
```

### NOTE
For debugging purpose, use the following to run the databse

```
docker run  --env MYSQL_ROOT_PASSWORD=pass -v $PWD/init:/docker-entrypoint-initdb.d -p 3306:3306 mysql
```
