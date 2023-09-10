import datetime
import jwt
from django.conf import settings


def generate_access_token(user):

    access_token_payload = {
        "user_id": user.id,
        "username": user.username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=15),
        "iat": datetime.datetime.utcnow(),
    }
    access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm="HS256")

    return access_token

def generate_refresh_token(user):

    current_time = datetime.datetime.utcnow()
    expiration_time = current_time + datetime.timedelta(days=7)

    refresh_token_payload = {
        "user_id": user.id,
       
        "exp": expiration_time,
        "iat": datetime.datetime.utcnow(),
    }

    refresh_token_payload = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm="HS256")

    return refresh_token_payload