# Simple Weather App


A simple weather app so you can start it, call for localhost:2000/addressYouWant set an interval for browser refresh, and have a nice and beautiful chart with the temperature and humidity of your location.

# Installation
```sh
 $ npm install
 ```

 # Set up environment variables 
  - SECONDS_REFRESH - seconds to refresh the api.
  - API_KEY - api key from forecast.io.
  
# Start it using the commands
```sh
 $ node app.js -s=seconds
 ```
# Run via docker
 You can also run this application via docker.
 First you need to execute the following command to generate the docker image with your application.
  ```sh
 $ docker build -t <username>/weatherapp).
 ```
 Then you can run the application by running.
 ```sh
$ docker run -p 2000:2000 -e API_KEY=<your-app-key> -e SECONDS_REFRESH=<seconds> -d <username>/weatherapp
```
That's all folks...