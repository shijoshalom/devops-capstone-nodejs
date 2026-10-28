FROM node:22-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package.json ./
COPY app.js ./

EXPOSE 3000

USER node

CMD ["npm", "start"]
