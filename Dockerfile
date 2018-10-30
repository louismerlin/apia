FROM node:10-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn --ignore-scripts
COPY .gitignore ./
COPY .babelrc ./
EXPOSE 3000
CMD ["yarn", "start"]
