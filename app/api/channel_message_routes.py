from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import ChannelMessage, db
from .channel_routes import channel_routes

#  url_prefix="/api/cms
channel_message_routes = Blueprint("channel_messages", __name__)

# get all messages
@channel_routes.route("/<int:serverId>/<int:channelId>/cms")
@login_required
def get_cms(serverId, channelId):
    # print("DATA messages ======>>>>>>> ", channelId)
    # msg = ChannelMessage.query.all()
    messages = ChannelMessage.query.filter(ChannelMessage.channel_id == channelId).all()
    return {"channel_message": [el.to_dict() for el in messages]}


# delete messages by channel id
@channel_message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_cms(id):
    data = ChannelMessage.query.get(id)
    temp = data.to_dict()
    # print("DATA messages ======>>>>>>> ", data)
    if data:
        db.session.delete(data)
        db.session.commit()
    return temp


# get messages by user id
# @channel_message_routes.route("/<int:id>")
# @login_required
# def server(id):
#     data = ChannelMessage.query.get(id)
#     return data.to_dict()


# @channel_message_routes.route("/", methods=["POST"])
# def create_message():
#     res = request.get_json()
#     data = ChannelMessage(
#         sender_id=current_user.id, message=res["message"], channel_id=res["channelId"]
#     )
#     db.session.add(data)
#     db.session.commit()
#     print("BACKEND----->>>> post for CM====", data)
#     return data.to_dict()


# -------------------------------------------------------
# -------------------------------------------------------
# -------------------------------------------------------
# -------------------------------------------------------

# @message_routes.route('/<int:id>', methods=['GET'])
# def get_messages(id):
#     messages = db.session.query(Message).filter(Message.channel_id == id).all()
#     result = [message.to_dict() for message in messages]
#     return {'messages':result}
