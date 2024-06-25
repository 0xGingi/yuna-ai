FROM python:3.12-bookworm

WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg

ADD . /app

RUN pip install --no-cache-dir -r docker/requirements-cpu.txt

EXPOSE 4848

CMD ["python", "index.py"]