FROM openjdk:8

WORKDIR /app

COPY store-api/src /app/src
COPY store-api/gradle /app/gradle
COPY store-api/build.gradle /app/build.gradle
COPY store-api/settings.gradle /app/settings.gradle
COPY store-api/gradlew /app/gradlew
COPY wait-for-it.sh /app/wait-for-it.sh

RUN chmod +x wait-for-it.sh \
    && ./gradlew clean build -x test
