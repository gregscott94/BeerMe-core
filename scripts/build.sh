#!/bin/bash
sudo docker stop beerme
sudo docker rm beerme
sudo docker rmi gscott08/beerme:latest
sudo docker build -t gscott08/beerme .
