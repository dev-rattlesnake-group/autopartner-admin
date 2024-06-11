FROM node:20-alpine AS development
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
