import os
import django
from django.core.management import call_command

seed_file_path = "./database/latest_initail_data.json"

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Set up Django
django.setup()

print("[...............................   Flushing database   ...............................]")
# call_command("flush", "--noinput")     # No verify
call_command("flush")
 
print("[...............................   Migrating database  ...............................] ")
call_command("migrate")

print("[...............................   Seeding database    ...............................]" )
call_command("loaddata", seed_file_path)
