import json
import random
import uuid
# from django.utils import timezone 
from datetime import datetime 
import pytz
timezone = pytz.timezone('Asia/Phnom_Penh')

# Predefined static data
image_paths = [
    "images/package_images/theentranceofbokorresortimagebyviator.jpg",
    "images/package_images/TB_Waterfall.jpg",
    "images/package_images/resort-in-kompong-som-2.jpg",
    "images/package_images/maxresdefault.jpg",
    "images/package_images/elephant-bayon-temple-angor-wat-cambodia_980x650.jpg",
    "images/package_images/city-6335042_1920.jpg",
    "images/package_images/Bokor-National-Park.jpg",
    "images/package_images/Bokor_palace_hotel_Cambodia.jpg",
    "images/package_images/Bokor_National_Park.jpg",
    "images/package_images/aa.jpg",
    "images/package_images/A-Guide-to-Bokor-National-Park-1.jpg",
    "images/package_images/1200px-Ankor_Wat_temple.jpg"
]

services = [
    {"detail": "Island hopping tour + lunch", "price": 6000.00},
    {"detail": "Snorkeling adventure + lunch + tuk tuk", "price": 10000.00},
    {"detail": "Scuba diving exploration", "price": 12000.00},
    {"detail": "Beachside relaxation package", "price": 15000.00},
    {"detail": "Seafood feast experience", "price": 18000.00},
    {"detail": "Boat cruise along the coast", "price": 20000.00},
    {"detail": "Sunset cocktail tour", "price": 22000.00},
    {"detail": "Fishing excursion", "price": 24000.00},
    {"detail": "Beach volleyball and BBQ", "price": 26000.00},
    {"detail": "Local cultural immersion tour + Hotel", "price": 30000.00}
]

schedules = [
    {"destination": "Morning Beach Walk", "start_time": "08:00", "end_time": "09:00"},
    {"destination": "Snorkeling Adventure", "start_time": "09:30", "end_time": "11:00"},
    {"destination": "Seafood Lunch", "start_time": "12:00", "end_time": "13:00"},
    {"destination": "Relaxation on the Beach", "start_time": "13:30", "end_time": "15:00"},
    {"destination": "Boat Cruise along the Coast", "start_time": "15:30", "end_time": "17:00"},
    {"destination": "Sunset Cocktail on the Beach", "start_time": "17:30", "end_time": "18:30"},
    {"destination": "Dinner with Beachside BBQ", "start_time": "19:00", "end_time": "20:30"},
    {"destination": "Evening Beach Bonfire", "start_time": "21:00", "end_time": "22:00"}
]

users = ["33be413a-dd3e-477a-ac7a-e8280c33ebbf", "0bb13a1d-e5f2-4c68-a5c4-0ee708168954"]
charge_types = ["dc4a63bc-56c6-4385-abeb-963c40150b60", "f2a1aaee-19e4-401b-8ea0-0a03ad7a6fe8"]
categories = [
    "15b9fc8c-637c-48fc-b60a-69091d2dc3f8",
    "6d8c7924-36b9-4d12-aa81-488b35efa5aa",
    "75646237-76cd-41bf-82e4-c2eb435a73b7",
    "91d2ad1e-b8ad-4772-a5f1-c066156f799e",
    "c49ed9cb-0933-4ed3-b359-ce08006b2de2"
]
package_names = [
    "ក្រុងសៀមរាប",
    "ជិះដំរី​ក្រុងអង្គរ",
    "ដំណើរកំសាន្តកំពង់សោម",
    "ដំណើរកំសាន្ត ភ្នំបូកគោ",
    "ដំណើរកំសាន្ត ភ្នំឱរាល",
    "ដើរព្រៃ ខ្នងផ្សា",
    "ក្រុងបាយដូង",
    "ឆ្នេរកោះស្មៅ",
    "រម្មនីយដ្ឋាន គិរីរម្យ",
    "ទឹកធ្លាក់វាលពួច",
    "ដំណើរកំសាន្ត ទឹកឈូ",
    "រម្មនីយដ្ឋាន តេទឹកពោះ",
    "សហគមន៍នេសាទត្រពាំងសង្កែ",
    "ដំណើរកំសាន្ត ដូងទេរ"
]

# Create data for packages, package images, package services, and package schedules
data = []

# Number of packages to generate
num_packages = 40

for _ in range(num_packages):
    package_id = str(uuid.uuid4())
    commission_id = "8123e37e-d617-42e6-a3dd-929c0091cb21"

    created_at = timezone.localize(datetime.now())
    
    package = {
        "model": "tour_package.package",
        "pk": package_id,
        "fields": {
            "user": random.choice(users),
            "name": str(random.choice(package_names)),
            "description": str("ប្រាសាទ អង្គរវត្ត ឬ នគរវត្ត (អង់គ្លេស: Angkor Wat) or (Nokor Wat) ជាប្រាសាទ ដែលធំបំផុត នៅក្នុងប្រទេសកម្ពុជា ដែលមានមាឌដ្ឋានលើផ្ទៃដីទំហំ ១៦២,៦ ហិចតា ដោយស្មើនឹង (1,626,000 m2) ។ រចនាសម្ព័ននៃសំណង់ប្រាសាទត្រូវ បានចាត់ទុកជាស្ថាបត្យកម្មដ៏កំពូល នៃ អច្ឆរិយៈវត្ថុរបស់ពិភពលោក ដែលត្រូវបានសាងសង់ឡើងក្នុងស.វទី១២ ដោយព្រះបាទ សូរ្យវរ្ម័នទី២ ដែលជាព្រះមហាក្សត្រ នាសម័យកាល ចក្រភពខ្មែរ ប្រាសាទនេះសាងសង់ ដើម្បីឧទ្ទិសឱ្យ ព្រហ្មញ្ញសាសនា នៃលទ្ធិជំនឿលើ ព្រះវិស្ណុ ដូចនេះហើយ ប្រាសាទអង្គរវត្តត្រូវបានគេសន្មតថា ជាប្រាសាទសាសនា ដែលធំបំផុតនៅលើពិភពលោក ដែលជាប់ក្នុងកំណត់ត្រាពិភពលោក (Guinness World Records) ក្នុងអំឡុងឆ្នាំ ១៩៨៥"),
            "category": random.choice(categories),
            "charge_type": random.choice(charge_types),
            "max_people": 5,
            "num_days": 1,
            "max_daily_bookings": 1,
            "percentage_discount": "20.00",
            "location_url": "https://maps.app.goo.gl/8G6fJ9PU1N5656AR9",
            "address": str("​ភូមិយស់ជោ ឃុំជើងរាស់ ស្រុកឧដុង្គ ក្រុងច្បារមន ខេត្ត កំពង់ស្ពឺ"),
            "commission": commission_id,
            "is_close": False,
            "created_at": created_at.isoformat()
        }
    }
    
    data.append(package)
    
    for image_path in image_paths[:5]:  # Only 5 images per package
        package_image = {
            "model": "tour_package.packageimage",
            "pk": str(uuid.uuid4()),
            "fields": {
                "package": package_id,
                "image": random.choice(image_paths),
                "type": "normal"
            }
        }
        data.append(package_image)
        
    for service in services:
        package_service = {
            "model": "tour_package.packageservice",
            "pk": str(uuid.uuid4()),
            "fields": {
                "package": package_id,
                "detail": service["detail"],
                "price": service["price"],
                "currency": "usd",
                "is_close": False
            }
        }
        data.append(package_service)
    
    for schedule in schedules:
        package_schedule = {
            "model": "tour_package.packageschedule",
            "pk": str(uuid.uuid4()),
            "fields": {
                "package": package_id,
                "destination": schedule["destination"],
                "start_time": schedule["start_time"],
                "end_time": schedule["end_time"]
            }
        }
        data.append(package_schedule)

# Write data to data.json file
path = "database/seeding/6-gernerate-seeding"
file_name = f"{path}/gernerate_package_seeding.json"
with open(file_name, 'w', encoding='utf-8') as outfile:
    json.dump(data, outfile, indent=4, ensure_ascii=False)
