FROM node:16
WORKDIR /utkarsh_app
EXPOSE 3000
COPY package.json /utkarsh_app/

RUN npm install
COPY . /utkarsh_app
CMD node src/index.js