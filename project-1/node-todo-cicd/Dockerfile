# # Node Base Image

#from stage builder
FROM node:12.2.0 AS builder

WORKDIR /app 

COPY  package*.json ./

RUN npm install 

COPY . .

FROM node:12.2.0-alpine AS  production

WORKDIR /app 

COPY --from=builder /app .

EXPOSE 8000

CMD ["node", "app.js"]



# FROM node:12.2.0-alpine

# #Working Directry
# WORKDIR /node

# #Copy the Code
# COPY . .

# #Install the dependecies
# RUN npm install
# RUN npm run test
# EXPOSE 8000

# #Run the code
# CMD ["node","app.js"]
