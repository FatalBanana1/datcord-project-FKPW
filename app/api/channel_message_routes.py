from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import ChannelMessage

#  url_prefix="/api/cms
channel_message_routes = Blueprint("channel_messages", __name__)


@channel_message_routes.route("/")
@login_required
def channel_messages():
    data = ChannelMessage.query.all()
    return {"channel_messages": [el.to_dict() for el in data]}


@channel_message_routes.route("/<int:id>")
@login_required
def server(id):
    data = ChannelMessage.query.get(id)
    return data.to_dict()


# -------------------------------------------------------
# -------------------------------------------------------
# -------------------------------------------------------
# -------------------------------------------------------

# @message_routes.route('/<int:id>', methods=['GET'])
# def get_messages(id):
#     messages = db.session.query(Message).filter(Message.channel_id == id).all()
#     result = [message.to_dict() for message in messages]
#     return {'messages':result}

# @message_routes.route('/', methods=['POST'])
# def create_message():
#     res = request.get_json()
#     message = Message(user_id= current_user.id,
#                       content= res["content"],
#                       channel_id= res["channelId"])
#     db.session.add(message)
#     db.session.commit()
#     return message.to_dict()
