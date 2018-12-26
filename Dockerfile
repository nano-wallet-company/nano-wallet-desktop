FROM node:10.15.0

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -q
RUN apt-get install -qy apt-utils apt-transport-https

RUN echo "en_US.UTF-8 UTF-8" | tee /etc/locale.gen
RUN apt-get install -qy locales
ENV LANG=en_US.UTF-8 LANGUAGE=en_US:en LC_ALL=en_US.UTF-8
RUN update-locale LANG=${LANG} LANGUAGE=${LANGUAGE} LC_ALL=${LC_ALL}

RUN echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google.list
RUN curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1 apt-key add -

RUN apt-get update -q
RUN apt-get install -qy google-chrome-stable

RUN mkdir -p /project
WORKDIR /project

COPY .yarnclean .
COPY patches/*.patch patches/
COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile --non-interactive

COPY . .

EXPOSE 4200 7020 7357 9222
CMD ["yarn", "start"]
