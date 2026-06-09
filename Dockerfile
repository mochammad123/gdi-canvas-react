FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.34.1 --activate

FROM base AS build
WORKDIR /build
ARG GITHUB_TOKEN
COPY . .
RUN test -n "$GITHUB_TOKEN" || (echo "ERROR: GITHUB_TOKEN build-arg is required for @knittotextile packages" && exit 1) && \
  printf '%s\n' \
    '@knittotextile:registry=https://npm.pkg.github.com' \
    "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" \
    > .npmrc && \
  pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:1.28-alpine
WORKDIR /app
COPY --from=build /build/dist /usr/share/nginx/html
COPY --from=build /build/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/config/entrypoint.sh /entrypoint.sh

# Fix line endings (convert CRLF to LF) and make executable
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
