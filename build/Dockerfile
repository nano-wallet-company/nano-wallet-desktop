FROM electronuserland/builder:wine-mono

RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y --no-install-recommends tzdata fakeroot

COPY package.json .
COPY yarn.lock .
COPY .yarnclean .

RUN yarn install --frozen-lockfile --non-interactive

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

ARG EMBER_ENV
ENV EMBER_ENV ${EMBER_ENV}

ARG ELECTRON_PLATFORM
ENV ELECTRON_PLATFORM ${ELECTRON_PLATFORM}

ARG ELECTRON_ARCH
ENV ELECTRON_ARCH ${ELECTRON_ARCH}

CMD yarn ember electron:make -e "${EMBER_ENV}" -p "${ELECTRON_PLATFORM}" -a "${ELECTRON_ARCH}"
