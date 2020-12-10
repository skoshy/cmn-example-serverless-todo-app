# influenced from https://gist.github.com/armand1m/b8061bcc9e8e9a5c1303854290c7d61e

FROM node:12.14.1-stretch-slim
WORKDIR /code

COPY ./scripts/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

ADD . .

CMD yarn start
