FROM python:3.8
ENV PYTHONUNBUFFERED=1
RUN mkdir -p /usr/src/app-backtend
WORKDIR /usr/src/app-backtend

COPY required.txt required.txt

RUN pip3 install mysqlclient
RUN pip3 install -r required.txt

COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
