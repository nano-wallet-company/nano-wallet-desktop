FROM node:10.13.0-stretch
LABEL maintainer="Nano Wallet Company <team@nanowalletcompany.com>"

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -q
RUN apt-get install -qy apt-utils apt-transport-https

RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN apt-get install -qy locales
ENV LC_ALL="en_US.UTF-8" LANG="en_US.UTF-8" LANGUAGE="en_US:en"

RUN curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

RUN apt-get update -q
RUN apt-get install -qy --no-install-recommends google-chrome-stable

RUN useradd -s /bin/bash -mb /usr/src app
USER app
WORKDIR /usr/src/app

COPY --chown=app:app package.json .
COPY --chown=app:app yarn.lock .

RUN yarn install --frozen-lockfile --non-interactive

COPY --chown=app:app . .

EXPOSE 4200 7020 7357 9222
CMD ["yarn", "start"]
