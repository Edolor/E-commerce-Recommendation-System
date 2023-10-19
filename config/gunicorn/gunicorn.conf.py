wsgi_app = "errand_boy.wsgi:application"

accesslog = errorlog = "/var/log/gunicorn/gunicorn.log"

workers = 2

loglevel = "debug"

capture_output = True

bind = "0.0.0.0:8000"
