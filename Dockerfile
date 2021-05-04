## this is the stage one , also know as the build step

FROM node:12.17.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

## this is stage two , where the app actually runs

FROM node:12.17.0-alpine

WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV PORT=4000
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist ./dist
COPY knexfile.ts ./dist/knexfile.js
EXPOSE 4000
CMD npm start

