#!/bin/bash

# Start Laravel in the background
cd /app
php artisan serve --host=0.0.0.0 --port=8000 &

# Start Angular
cd /app/resources/frontend/angular
npm run start:prod &

# Keep the container running
wait
