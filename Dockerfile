FROM node:10.14.1

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

RUN mkdir -p /usr/src/app
RUN chown -R node:node /usr/src/app
USER node
WORKDIR /usr/src/app

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node .yarnclean .

RUN yarn install --frozen-lockfile --non-interactive

COPY --chown=node:node . .

EXPOSE 4200 7020 7357 9222
CMD ["yarn", "start"]
