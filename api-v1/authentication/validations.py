from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

import re

User = get_user_model()

def is_valid_email(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    if(re.fullmatch(regex, email)):
        return True
    return False

def is_valid_password(password):
    if len(password) < 8:
        return False
    
    if not re.search(r"[a-zA-Z]", password):
        return False
    
    if not re.search(r"[\d]", password):
        return False
    
    return True

def is_valid_username(username):
    # username - only letters, digits, and underscores
    if re.match("^[a-zA-Z0-9_]+$", username):
        return True
    return False

def user_validation(data):
    print(data.get('username', ""))
    print(data['username'].strip())
    username = data['username'].strip()
    email = data['email'].strip()
    password = data['password'].strip()

    errors = {}

    if not username or User.objects.filter(username=username).exists():
        errors['username'] = ['This username already token. Please choose another one.']

    if not is_valid_password(password):
        errors['password'] = ['Your password must be at least 8 charectors long, one letter and one digit.']
    
    if not is_valid_email(email):
        errors['email'] = ['Please provide a valid email address']

    print(errors)

    if errors:
        raise ValidationError(errors)
    
    return data

def username_exist(username):
    if User.objects.filter(username=username).exists():
        return True
    return False

def validate_user_update(user_update, request_data):
    errors = {}
    if 'username' in request_data:
        username = request_data['username']
        if is_valid_username(username) and not username_exist(username):
            user_update.username = username
        else:
            errors['username'] = 'This username already token. Please choose another one.'
    if 'fullname' in request_data:
        fullname = request_data['fullname']
        user_update.fullname = fullname

    if 'email' in request_data:
        email = request_data['email']
        if is_valid_email(email):
            user_update.email = email
        else:
            errors['email'] = 'Please provide a valid email address'

    if 'phone' in request_data:
        phone = request_data['phone']
        user_update.phone = request_data['phone']

    if 'password' in request_data:
        password = request_data['password']
        if is_valid_password(password):
            user_update.set_password(password)
        else:
            errors['password'] = 'Your password must be at least 8 charectors long, one letter and one digit.'
    if errors:
        raise ValidationError(errors)
    user_update.save()
    return user_update
                        
                        
    