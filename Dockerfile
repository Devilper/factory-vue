FROM nginx:latest
MAINTAINER factory
COPY dist/  /home/myhtml/front/
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo 'echo init ok!!'
