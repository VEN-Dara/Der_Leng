import requests
from telegram import Chat, Update
from telegram.ext import ContextTypes
from core.settings.base import TELGRAM_BOT_TOKEN
from telegrambot.bot.telegrambot import handle_response
from telegrambot.models import TelegramAccount
from telegrambot.serializers import TelegramAccountSerializer

TELEGRAM_API_URL = f'https://api.telegram.org/bot{TELGRAM_BOT_TOKEN}/'

def handle_update(update: Update):
    if update.message:
        chat: Chat = update.message.chat
        chat_id = update.message.chat.id
        text = update.message.text

        # Exist acc
        try:
            acc = TelegramAccount.objects.get(id=chat_id)
        except TelegramAccount.DoesNotExist:
            create_acc = TelegramAccount(
                id = chat.id,
                username = chat.username,
                first_name = chat.first_name,
                last_name = chat.last_name,
                type = chat.type,
            )
            serializer = TelegramAccountSerializer(data=create_acc)
            serializer.is_valid(raise_exception=True)
            acc = serializer.save()

        response = handle_response(text, acc)
    # elif update.channel_post:
    #     chat_id = update.channel_post.chat.id
    #     text = update.channel_post.text
    #     response = handle_response(text)
    else:
        return

    send_message("sendMessage", {
        'chat_id': chat_id,
        'text': response,
        'parse_mode': 'Markdown'
    })

def send_message(method, data):
    return requests.post(TELEGRAM_API_URL + method, data)
