# Use the official Apache HTTP Server base image
FROM httpd:latest

# # Copy your custom configuration file to the container
# COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf

# # Copy your web content to the container
# COPY ./my-web-content /usr/local/apache2/htdocs/

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start the Apache HTTP Server
CMD ["httpd-foreground"]