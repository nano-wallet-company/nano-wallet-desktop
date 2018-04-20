FROM node:9.11.1
LABEL maintainer="Nano Wallet Company <desktop@nanowalletcompany.com>"

RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN apt-get update
RUN apt-get install -qq --no-install-recommends google-chrome-stable

RUN useradd -s /bin/bash -mb /usr/src app
USER app
WORKDIR /usr/src/app

COPY --chown=app:app package.json .
COPY --chown=app:app yarn.lock .

RUN yarn install --frozen-lockfile --non-interactive

COPY --chown=app:app . .

EXPOSE 4200 7020 7357 9222
CMD ["yarn", "start"]
