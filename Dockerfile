FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@9.15.3 --activate
COPY . /app
WORKDIR /app

FROM base AS build
WORKDIR /build
COPY . .
RUN --mount=type=secret,id=github_token \
    echo "//npm.pkg.github.com/:_authToken=$(cat /run/secrets/github_token)" > .npmrc
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:stable-alpine
WORKDIR /app
COPY --from=build /build/dist /usr/share/nginx/html
COPY --from=build /build/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/config/entrypoint.sh /entrypoint.sh

# Fix line endings (convert CRLF to LF) and make executable
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
