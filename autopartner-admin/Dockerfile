FROM node:20-alpine as development

WORKDIR /usr/src/app
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
ENV NODE_ENV development
COPY package*.json ./
RUN npm install

CMD ["npm", "run", "dev"]
