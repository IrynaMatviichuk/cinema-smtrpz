FROM python:3.7.7-alpine

COPY requiremets.txt app/
RUN apk update && apk add postgresql-dev gcc musl-dev
RUN pip3 install -r app/requiremets.txt
COPY . app/
WORKDIR /app
EXPOSE 8083

ENTRYPOINT ["python", "run.py"]