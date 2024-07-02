import requests
from core.settings.base import API_DOMAIN_NAME, TELEGRAM_API_URL, TELGRAM_BOT_TOKEN

WEBHOOK_URL = f'{API_DOMAIN_NAME}/bot/webhook/'

print("Setup telegram bot webhook...")
print("Connecting TelegramBot to API: " + API_DOMAIN_NAME)

try:
    response = requests.get(f'https://api.telegram.org/bot{TELGRAM_BOT_TOKEN}/setWebhook?url={WEBHOOK_URL}')
    response.raise_for_status()
    data = response.json()
    print(data["description"] + " successfully.")
except requests.RequestException as error:
    print(str(error))
    print("Set webhook failed.")