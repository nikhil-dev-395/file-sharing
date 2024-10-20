# file sharing app

`tech stack -  ejs, tailwind css, express js, node js, mongodb`

following command for running tailwind css and node js app at same time

```
yarn dev

```

and this following command is used for running node js server

```
yarn start

```

`"dev": "concurrently "nodemon server.js" "npx tailwindcss -i ./public/stylesheet/style.css -o ./public/stylesheet/tailwind.css --watch"",`

```
# .env file

PORT = your port | 3000
MONGO_URI = your mongodb url
```


