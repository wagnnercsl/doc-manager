# Start with PHP base image
FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Clear cache
# RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Set working directory
WORKDIR /app

# Now copy the entire Laravel application
COPY . /app

# Install PHP dependencies
RUN composer install --ignore-platform-req=ext-zip

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Angular dependencies
WORKDIR /app/resources/frontend/angular
RUN npm install --save
# RUN npm start


# Create a startup script
WORKDIR /app
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose ports for both Laravel and Angular

# CMD php artisan serve --host=0.0.0.0 --port=8181
EXPOSE 8181 4200

# # Start both services using the shell script
CMD ["/start.sh"]
