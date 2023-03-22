FROM python:3.10.3-slim-bullseye

WORKDIR /app

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "-c", "config/gunicorn/gunicorn.conf.py"]