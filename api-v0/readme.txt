#=================> Seed Data
python manage.py loaddata ./database/0004_initail_data.json         # Use the latest file json

#==================> Backup database to Json
python -Xutf8 ./manage.py dumpdata app-1 app-2 --indent 4 > data.json
or
python ./manage.py dumpdata app-1 app-2 --indent 4 -o data.json

#==================> Fake database
python manage.py seed app-1 --number=15