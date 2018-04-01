FROM node:9.10.0
LABEL maintainer="Nano <desktop@nano.org>"

RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google.list

RUN apt-get update
RUN apt-get install -qq --no-install-recommends yarn=1.5.1 google-chrome-stable

RUN useradd -s /bin/bash -mb /usr/src app
USER app
WORKDIR /usr/src/app

COPY --chown=app:app package.json .
COPY --chown=app:app yarn.lock .

RUN yarn install --frozen-lockfile --non-interactive

COPY --chown=app:app . .

EXPOSE 4200 7020 7357 9222
CMD ["yarn", "start"]
