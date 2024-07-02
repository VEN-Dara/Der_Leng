import random
from django_filters.filters import Q
import spacy
from telegram import Chat
from django.contrib.auth import authenticate

from authentication.models import User
from telegrambot.models import TelegramAccount

nlp = spacy.load("en_core_web_md")

# Question
sales_questions = [
    "What are the total sales for today?",
    "Can you tell me the total revenue for today?",
    "How much money did we make in sales today?",
    "What's the total amount of sales for today?",
    "Could you provide the total sales figures for today?",
    "What's the sum of all sales transactions today?",
    "Can you give me an overview of today's sales?"
]

greetings = [
    "hello",
    "hey",
    "Hello!",
    "Hi there!",
    "Hey!",
    "Good morning!",
    "Good afternoon!",
    "Good evening!",
    "Greetings!",
    "Howdy!",
    "What's up?",
    "Can you help?"
]

questions = sales_questions + greetings

# Response
bot_responses = [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Hey! Welcome! How may I be of service?",
    "Greetings! How may I assist you today?",
    "Howdy! What can I help you with?",
    "Not much. Just here to assist you! How can I help?",
    "Hey! I'm here to assist you. What do you need?",
    "Hi! I'm here and ready to help. What can I do for you?",
    "Hello! How are you today? How can I assist you?",
    "Hi there! I'm here to help. What can I do for you?",
    "Hey! What's up? How can I assist you today?",
    "Good to see you! How may I assist you?",
]

no_understand_responses = [
    "I'm sorry, I didn't quite catch that.",
    "Hmm, could you please rephrase your question?",
    "I'm not sure I understand. Could you provide more context?",
    "Apologies, I'm having trouble understanding your query.",
    "I'm afraid I can't answer that. Can you try asking in a different way?",
]

def find_similar_question(user_query):
    similar_question = None
    max_similarity = 0
    user_doc = nlp(user_query.lower())

    for question in questions:
        question_doc = nlp(question.lower())
        similarity = user_doc.similarity(question_doc)
        if similarity > max_similarity:
            max_similarity = similarity
            similar_question = question

    return similar_question, max_similarity

def handle_response(user_query, telegram_account: TelegramAccount) -> str:
    response = ""
    if(user_query.startswith('/enable_telegram_2fa')):
        response = "សូមបញ្ចូលឈ្មោះគណនី(username) ឬអ៊ីមែល នៃគណនីដើរលេងរបស់អ្នក"
        telegram_account.last_bot_message = response
        telegram_account.save()
        return response
    
    elif user_query.startswith('/cancel'):
        response = "ពាក្យបញ្ជាត្រូវបានបញ្ឈប់។ តើមានអ្វីផ្សេងទៀតដែលខ្ញុំអាចជួយអ្នក?"
        telegram_account.last_bot_message = response
        telegram_account.save()
        return response
    
    elif telegram_account.last_bot_message.startswith('សូមបញ្ចូលឈ្មោះគណនី(username) ឬអ៊ីមែល នៃគណនីដើរលេងរបស់អ្នក'):
        response = "សូម​បញ្ចូល​ពាក្យ​សម្ងាត់​គណនីដើរលេងរបស់អ្នក"
        telegram_account.last_bot_message = response
        telegram_account.last_user_response = user_query
        telegram_account.save()
        return response
    
    elif telegram_account.last_bot_message.startswith("សូម​បញ្ចូល​ពាក្យ​សម្ងាត់​គណនីដើរលេងរបស់អ្នក"):
        username = telegram_account.last_user_response
        password = user_query
        find_users = User.objects.filter(Q(username=username) or Q(email=username) or Q(phone=username))
        for user in find_users:
            auth : User = authenticate(username=user.username, password=password)
            if(auth):
                auth.telegram_account = telegram_account
                auth.save()
                response = "អ្នកបានភ្ជាប់គណនី ដើរលេង របស់អ្នកដោយជោគជ័យជាមួយ Telegram ។✅✨"
                telegram_account.last_bot_message = response
                telegram_account.save()
                return response
        
        response = "ឈ្មោះគណនី ឬពាក្យសម្ងាត់របស់អ្នកមិនត្រឹមត្រូវទេ។ \nសូមព្យាយាមម្ដងទៀត"
        telegram_account.last_bot_message = response
        telegram_account.save()
        return response

    return no_understand_responses[random.randint(0, len(no_understand_responses)-1)]


    # similar_question, max_similarity = find_similar_question(user_query)

    # recommendation = "\n\n*Ask me something like*:\n" + greetings[3] + "\n" + sales_questions[0] + "\n" + sales_questions[2] + "\n" + sales_questions[random.randint(3, len(sales_questions)-1)]

    # if max_similarity > 0.7:
    #     if similar_question in greetings:
    #         return bot_responses[random.randint(0, len(bot_responses)-1)] + recommendation
    #     if similar_question in sales_questions:
    #         return f"របាយការណ៍លក់ថ្ងៃនេះ៖\n--------------------\nលក់សរុប៖  រៀល"
    # elif max_similarity > 0.4:
    #     response = no_understand_responses[random.randint(0, len(no_understand_responses)-1)] + "\n"
    #     response += "*Did you mean*: " + similar_question
    #     return response
        
    # response = no_understand_responses[random.randint(0, len(no_understand_responses)-1)]
    # response += recommendation
    # return response