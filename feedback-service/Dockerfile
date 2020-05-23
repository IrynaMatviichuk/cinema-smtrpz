FROM python:3.7.7-alpine

COPY requirements.txt app/
RUN apk update && apk add postgresql-dev gcc musl-dev
RUN pip3 install -r app/requirements.txt
COPY . app/
WORKDIR /app
EXPOSE 8084

ENTRYPOINT ["python", "run.py"]