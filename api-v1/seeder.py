import os
import django
from django.core.management import call_command

seeding_folder_path = "./database/seeding"

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

# Set up Django
django.setup()

# print("[...............................   Flushing database   ...............................]")
# call_command("flush", "--noinput")     # No verify
# # call_command("flush")
 
# print("[...............................   Migrating database  ...............................] ")
# call_command("migrate")

print("[...............................   Seeding database    ...............................]" )

print("..........::>> Auth <<::..........")
print("..........::>> Seed: ./database/seeding/1-data-setup/user_role_seeding.json")
call_command("loaddata", "./database/seeding/1-data-setup/user_role_seeding.json")

print("..........::>> Seed: ./database/seeding/2-user/user_seeding.json")
call_command("loaddata", "./database/seeding/2-user/user_seeding.json")

print("..........::>> Seed: ./database/seeding/1-data-setup/oauth2_application_seeding.json")
call_command("loaddata", "./database/seeding/1-data-setup/oauth2_application_seeding.json")

print("\n..........::>> Tour_package <<::..........")
print("..........::>> Seed: ./database/seeding/1-data-setup/package_category_seeding.json")
call_command("loaddata", "./database/seeding/1-data-setup/package_category_seeding.json")

print("..........::>> Seed: ./database/seeding/1-data-setup/package_charge_type_seeding.json")
call_command("loaddata", "./database/seeding/1-data-setup/package_charge_type_seeding.json")

print("..........::>> Seed: ./database/seeding/1-data-setup/package_commission_seeding.json")
call_command("loaddata", "./database/seeding/1-data-setup/package_commission_seeding.json")

print("..........::>> Seed: ./database/seeding/3-package/package_seeding.json")
call_command("loaddata", "./database/seeding/3-package/package_seeding.json")
