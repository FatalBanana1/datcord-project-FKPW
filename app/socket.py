from flask_socketio import SocketIO, emit, join_room, leave_room, send
from .models import ChannelMessage, db
import os, json


# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    # origins = [
    #     'http://actual-app-url.herokuapp.com',
    #     'https://actual-app-url.herokuapp.com'
    # ]
    origins = "*"
else:
    origins = "*"

# initialize socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("channel_message")
def handle_channel_message(data):
    print(f"backend socket . py ====== data >>>>> ----", data)
    # new_message = ChannelMessage(sender_id=data["sender_id"], message=data["message"])
    message = ChannelMessage(
        {"sender_id": data["sender_id"], "message": data["message"]}
    )
    db.session.add(message)
    db.session.commit()
    emit("channel_messages", data, broadcast=True)


# ----------------------------------------------
# ----------------------------------------------
# ----------------------------------------------
# ----------------------------------------------


# @socketio.on("chat")
# def handle_chat(data):
#     # msgArr = []
#     # message = Message(user_id=sender_user_id,
#     #                   content = data.msg
#     #                   channel_id = data.channelId)
#     # msgArr.append(message)
#     # """
#     # room = data['channelId']
#     # emit("chat", data, room=room)
#     message = Message(
#         **{
#             "user_id": data["user_id"],
#             "channel_id": data["channelId"],
#             "content": data["content"],
#         }
#     )
#     db.session.add(message)
#     db.session.commit()
#     chat_data = message.to_dict()
#     chat_data["created_at"] = chat_data["created_at"].time()
#     chat_data["updated_at"] = chat_data["updated_at"].time()
#     room = str(data["channelId"])
#     emit(
#         "chat", json.dumps(chat_data, indent=4, sort_keys=True, default=str), room=room
#     )


# @socketio.on("join")
# def on_join(data):
#     username = data["username"]
#     room = data["channelId"]
#     join_room(room)
#     send(username + " has entered the room.", to=room)
