#!/bin/bash

# Start Laravel in the background
cd /app
php artisan serve --host=0.0.0.0 --port=8181 &

# Start Angular
cd /app/resources/frontend/angular
npm start &

# Keep the container running
wait
