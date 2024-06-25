FROM python:3.12-bookworm

WORKDIR /app

ADD . /app

RUN pip install --no-cache-dir -r docker/requirements.txt

EXPOSE 4848

CMD ["python", "index.py"]