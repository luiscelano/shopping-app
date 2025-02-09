#!/bin/bash

# Start each service in the background
mvn -f apigateway/pom.xml spring-boot:run &
mvn -f services/auth/pom.xml spring-boot:run &
mvn -f services/orders/pom.xml spring-boot:run &
mvn -f services/accounts/pom.xml spring-boot:run &
mvn -f services/products/pom.xml spring-boot:run &

# Wait for all background processes to finish
wait

