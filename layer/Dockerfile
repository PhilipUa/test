FROM amazonlinux:latest

RUN mkdir /layer

WORKDIR /layer
COPY ./nodejs/node14/package.json ./
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum -y install nodejs


