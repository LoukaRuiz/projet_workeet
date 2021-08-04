FROM mhart/alpine-node:12

# Create app directory
WORKDIR /src

COPY . .

RUN npm install
RUN npm prune --production

EXPOSE 3000

CMD [ "npm", "start" ]