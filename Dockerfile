FROM node:8.9.3
LABEL maintainer="Devin Alexander Torres <d@devinus.io>"

RUN curl -sSL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

RUN apt-get update
RUN apt-get install -qq --no-install-recommends google-chrome-stable

RUN useradd -rs /bin/bash -mb / app
USER app
WORKDIR /app

COPY --chown=app:app package.json .
COPY --chown=app:app package-lock.json .
RUN npm install

COPY --chown=app:app . .

EXPOSE 4200 7020 7357 9222
CMD ["npm", "start"]
