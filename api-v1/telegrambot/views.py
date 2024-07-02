import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from telegram import Update, Bot
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters
from asgiref.sync import async_to_sync
from .handlers import handle_update

from core.settings.base import TELGRAM_BOT_TOKEN
TOKEN = TELGRAM_BOT_TOKEN
bot = Bot(token=TOKEN)

@csrf_exempt
def webhook(request):
    if request.method == 'POST':
        update = Update.de_json(json.loads(request.body), bot)
        handle_update(update)
        return JsonResponse({'status': 'ok'})
    else:
        return JsonResponse({'status': 'error'}, status=403)
