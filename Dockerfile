FROM nginx:latest

COPY Calculator.html /usr/share/nginx/html
COPY Calculator.js /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
