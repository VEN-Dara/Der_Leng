import os
import django
from django.core.management import call_command

seeding_folder_path = "./database/seeding"

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

# Set up Django
django.setup()

print("\033[1;32m[...............................   Flushing database   ...............................]\033[0m")
call_command("flush", "--noinput")

print("\033[1;32m[...............................   Migrating database  ...............................]\033[0m")
call_command("migrate")

print("\033[1;32m[...............................   Seeding database    ...............................]\033[0m")

print("\n\033[1;34m...............................::>> Telegram bot <<::...............................\033[0m")
print("\033[1;34m..........::>> Seed: ./database/seeding/4-telegrambot/telegram_account_seeding.json\033[0m")
call_command("loaddata", "./database/seeding/4-telegrambot/telegram_account_seeding.json")

print("\n\033[1;34m...............................::>> Auth <<::...............................\033[0m")
print("\033[1;34m..........::>> Seed: ./database/seeding/1-data-setup/user_role_seeding.json\033[0m")
call_command("loaddata", "./database/seeding/1-data-setup/user_role_seeding.json")

print("\033[1;34m..........::>> Seed: ./database/seeding/2-user/user_seeding.json\033[0m")
call_command("loaddata", "./database/seeding/2-user/user_seeding.json")

print("\n\033[1;34m...............................::>> Tour_package <<::...............................\033[0m")
print("\033[1;34m..........::>> Seed: ./database/seeding/1-data-setup/package_category_seeding.json\033[0m")
call_command("loaddata", "./database/seeding/1-data-setup/package_category_seeding.json")

print("\033[1;34m..........::>> Seed: ./database/seeding/1-data-setup/package_charge_type_seeding.json\033[0m")
call_command("loaddata", "./database/seeding/1-data-setup/package_charge_type_seeding.json")

print("\033[1;34m..........::>> Seed: ./database/seeding/1-data-setup/package_commission_seeding.json\033[0m")
call_command("loaddata", "./database/seeding/1-data-setup/package_commission_seeding.json")

print("\033[1;34m..........::>> Seed: ./database/seeding/3-package/package_seeding.json\033[0m")
call_command("loaddata", "./database/seeding/3-package/package_seeding.json")

print("\n\033[1;34m...............................::>> Payment <<::...............................\033[0m")
print("\033[1;34m..........::>> Seed: ./database/seeding/5-payment/payment_method_seeding.json\033[0m")
call_command("loaddata", "./database/seeding/5-payment/payment_method_seeding.json")

print("\n\033[1;34m...............................::>> Social Oauth 2 <<::...............................\033[0m")
print("\033[1;34m..........::>> Seed: ./database/seeding/1-data-setup/oauth2_application_seeding.json\033[0m")
call_command("loaddata", "./database/seeding/1-data-setup/oauth2_application_seeding.json")

print("\n\033[1;32m============================================================================\033[0m")
print("\033[1;32m=                                                                          =\033[0m")
print("\033[1;32m=                       SEEDING ALL DATA SUCCESSFUL                        =\033[0m")
print("\033[1;32m=                                                                          =\033[0m")
print("\033[1;32m============================================================================\033[0m")

