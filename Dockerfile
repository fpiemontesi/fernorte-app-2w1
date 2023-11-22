FROM node:18-alpine
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4200
RUN     npm install -g @angular/cli
CMD ng serve --host 0.0.0.0