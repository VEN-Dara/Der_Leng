import os
import django
from django.core.management import call_command

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Set up Django
django.setup()

# Specify the backup directory and file pattern
backup_dir = "database"
file_pattern = "backup_data.json"
latest_backup_name = "latest_backup_data.json"

# Create the backup directory if it doesn't exist
if not os.path.exists(backup_dir):
    os.makedirs(backup_dir)

# Find existing backup files
existing_backups = [f for f in os.listdir(backup_dir) if f.endswith(file_pattern)]
existing_backups.sort()

# Rename the latest backup to "sequenceNumber_data.json"
if existing_backups:
    if len(existing_backups) == 1 :
        last_backup_with_sequence_name = f"0000_{file_pattern}"
    else:
        last_backup_with_sequence_name = existing_backups[-2]
        
    last_backup = existing_backups[-1]
    sequence_number = int(last_backup_with_sequence_name.split("_")[0]) + 1
    last_backup_name = f"{sequence_number:04d}_{file_pattern}"

    old_last_backup_path = os.path.join(backup_dir, last_backup)
    new_name_last_backup_path = os.path.join(backup_dir, last_backup_name)
    os.rename(old_last_backup_path, new_name_last_backup_path)
    print(f"Renamed {last_backup} to {last_backup_name}")

# Perform the data dump using dumpdata
backup_path = os.path.join(backup_dir, latest_backup_name)
call_command("dumpdata", "--indent", "2", "authentication", "derleng", "-o", backup_path)

print(f"Data dumped to {backup_path}")
