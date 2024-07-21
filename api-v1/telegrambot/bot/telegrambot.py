import random
import spacy
from django_filters.filters import Q
from django.contrib.auth import authenticate
from telegram import Chat
from authentication.models import User
from telegrambot.models import TelegramAccount

nlp = spacy.load("en_core_web_md")

# Questions and Responses
sales_questions = [
    "What are the total sales for today?",
    "Can you tell me the total revenue for today?",
    "How much money did we make in sales today?",
    "What's the total amount of sales for today?",
    "Could you provide the total sales figures for today?",
    "What's the sum of all sales transactions today?",
    "Can you give me an overview of today's sales?"
]

who_creators = [
    "Tell me about your creator.",
    "Who is your creator?", 
    "Who is the creator of this Telegram bot?",  
    "Who designed this Telegram bot?",
    "Can you tell me about the developer of this bot?", 
    "Which company or group is responsible for this bot?",
    "What was the inspiration behind this bot?",
    "Can you provide details about the creator of this bot?"
]

purpose_questions = [
    "Your purpose?"
    "What is your purpose?",
    "Why was this bot created?",
    "What can this bot help me with?",
    "What goals does this bot aim to achieve?",
    "How is this bot intended to assist users?"
]

purpose_response = "This bot is designed to help and assist users for ដើរលេង - Derleng ecommerce. It provides information, answers questions, and supports 2fa and notify functionalities."


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

bot_responses = [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Hey! Welcome! How may I be of service?",
    "Greetings! How may I assist you today?",
    "Not much. Just here to assist you! How can I help?",
    "Hey! I'm here to assist you. What do you need?",
    "Hi! I'm here and ready to help. What can I do for you?",
    "Hello! How are you today? How can I assist you?",
    "Hi there! I'm here to help. What can I do for you?",
    "Hey! What's up? How can I assist you today?",
    "Good to see you! How may I assist you?",
]

creator_response = (
    "My creator is Mr. ***VEN Dara***, a fourth-year student in Computer Science at the Institute of Technology of Cambodia. "
    "He is deeply passionate about full stack development and artificial intelligence (AI)."
)

no_understand_responses = [
    "I'm sorry, I didn't quite catch that.",
    "Hmm, could you please rephrase your question?",
    "I'm not sure I understand. Could you provide more context?",
    "Apologies, I'm having trouble understanding your query.",
    "I'm afraid I can't answer that. Can you try asking in a different way?",
]

questions = greetings + who_creators + purpose_questions

# Helper Functions
def find_similar_question(user_query):
    user_doc = nlp(user_query.lower())
    max_similarity = 0
    similar_question = None

    for question in questions:
        question_doc = nlp(question.lower())
        similarity = user_doc.similarity(question_doc)
        if similarity > max_similarity:
            max_similarity = similarity
            similar_question = question

    return similar_question, max_similarity

def handle_2fa_request(user_query, telegram_account):
    response = "សូមបញ្ចូលឈ្មោះគណនី(username) ឬអ៊ីមែល នៃគណនីដើរលេងរបស់អ្នក"
    telegram_account.last_bot_message = response
    telegram_account.save()
    return response

def handle_cancel_request(telegram_account):
    response = "ពាក្យបញ្ជាត្រូវបានបញ្ឈប់។ តើមានអ្វីផ្សេងទៀតដែលខ្ញុំអាចជួយអ្នក?"
    telegram_account.last_bot_message = response
    telegram_account.save()
    return response

def handle_login_request(user_query, telegram_account):
    response = "សូមបញ្ចូលពាក្យសម្ងាត់គណនីដើរលេងរបស់អ្នក"
    telegram_account.last_bot_message = response
    telegram_account.last_user_response = user_query
    telegram_account.save()
    return response

def authenticate_user(user_query, telegram_account):
    username = telegram_account.last_user_response
    password = user_query
    users = User.objects.filter(Q(username=username) | Q(email=username) | Q(phone=username))

    for user in users:
        auth = authenticate(username=user.username, password=password)
        if auth:
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

def handle_start_request():
    return random.choice(bot_responses)

def handle_general_query(user_query):
    similar_question, max_similarity = find_similar_question(user_query)
    recommendation = "\n\n*Ask me something like*:\n" + "\n".join([
        greetings[3],
        who_creators[0],
        random.choice(who_creators)
    ])

    if max_similarity > 0.8:
        if similar_question in greetings:
            return handle_start_request() + recommendation
        if similar_question in who_creators:
            return creator_response
        if similar_question in purpose_questions:
            return purpose_response
    elif max_similarity > 0.4:
        return no_understand_responses[random.randint(0, len(no_understand_responses)-1)] + "\n*Did you mean*: " + similar_question

    return no_understand_responses[random.randint(0, len(no_understand_responses)-1)] + recommendation

# Main Handler Function
def handle_response(user_query, telegram_account: TelegramAccount) -> str:
    if user_query and user_query.startswith('/enable_telegram_2fa'):
        return handle_2fa_request(user_query, telegram_account)

    if user_query and user_query.startswith('/cancel'):
        return handle_cancel_request(telegram_account)

    if telegram_account.last_bot_message and telegram_account.last_bot_message.startswith('សូមបញ្ចូលឈ្មោះគណនី(username) ឬអ៊ីមែល នៃគណនីដើរលេងរបស់អ្នក'):
        return handle_login_request(user_query, telegram_account)

    if telegram_account.last_bot_message and telegram_account.last_bot_message.startswith("សូមបញ្ចូលពាក្យសម្ងាត់គណនីដើរលេងរបស់អ្នក"):
        return authenticate_user(user_query, telegram_account)

    if user_query and user_query.startswith('/start'):
        return handle_start_request()

    return handle_general_query(user_query)
