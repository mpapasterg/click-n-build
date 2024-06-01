# Prepare

FROM node:20.5.1-bookworm as base

ARG PORT=8000

ENV NODE_ENV=production

WORKDIR /nuxt

# Build

FROM base as build

COPY --link package*.json .
RUN npm install --production=false

COPY --link . .

RUN npm run build
RUN npm prune

# Run

FROM base

COPY --from=build /nuxt/.output .output

ENV PORT=${PORT}

CMD [ "node", ".output/server/index.mjs" ]
