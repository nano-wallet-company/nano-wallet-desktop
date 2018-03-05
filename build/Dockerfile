FROM electronuserland/electron-builder:wine-mono
LABEL maintainer="Nano Labs <engineering@nano.co>"

RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update
RUN apt-get install -y tzdata fakeroot
RUN apt-get install -y --no-install-recommends yarn

COPY package.json .
COPY yarn.lock .

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
RUN yarn install

ARG EMBER_ENV
ENV EMBER_ENV ${EMBER_ENV}
ARG ELECTRON_PLATFORM
ENV ELECTRON_PLATFORM ${ELECTRON_PLATFORM}
ARG ELECTRON_ARCH ${ELECTRON_ARCH}

CMD ["yarn", "run", "ember", "electron:make", "-e", "${EMBER_ENV}", "-p", "${ELECTRON_PLATFORM}", "-a", "${ELECTRON_ARCH}"]
