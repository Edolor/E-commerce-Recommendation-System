FROM python:3.10.3-slim-bullseye

WORKDIR /app
RUN mkdir staticfiles

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

#  create gunicorn log directory
RUN mkdir /var/log/gunicorn

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

EXPOSE 8000

# CMD ["gunicorn", "-c", "config/gunicorn/gunicorn.conf.py"]
CMD ["gunicorn", "ecommerce.wsgi"]