# FROM node:13.1-alpine

# COPY . app/
# WORKDIR /app
# RUN npm install
# RUN npm run build

# ENTRYPOINT [ "npm", "start" ]

FROM node:13.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
