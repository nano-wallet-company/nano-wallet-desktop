FROM electronuserland/builder:wine-mono

RUN apt-get update -q
RUN apt-get install -qy apt-utils
RUN apt-get install -qy tzdata fakeroot

COPY .yarnclean .
COPY patches/*.patch patches/
COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile --non-interactive

COPY . .

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

ARG EMBER_ENV
ENV EMBER_ENV ${EMBER_ENV}

ARG ELECTRON_PLATFORM
ENV ELECTRON_PLATFORM ${ELECTRON_PLATFORM}

ARG ELECTRON_ARCH
ENV ELECTRON_ARCH ${ELECTRON_ARCH}

CMD yarn ember electron:make -e "${EMBER_ENV}" -p "${ELECTRON_PLATFORM}" -a "${ELECTRON_ARCH}"
