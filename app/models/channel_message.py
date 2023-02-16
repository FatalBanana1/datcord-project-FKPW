from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.dialects.postgresql import VARCHAR
from datetime import datetime


class ChannelMessage(db.Model):
    __tablename__ = "channel_messages_table"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("server_members_table.id")),
        nullable=False,
    )
    channel_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("channels_table.id")),
        nullable=False,
    )
    message = db.Column(db.String(length=1000), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    sender = db.relationship("ServerMember", back_populates="channel_messages")
    channel = db.relationship("Channel", back_populates="channel_messages")

    def to_dict(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "channel_id": self.channel_id,
            "message": self.message,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "sender_id": self.sender.id,
            "sender_nickname": self.sender.nickname,
            "role": self.sender.role,
            "display_pic": self.sender.user.display_pic,
        }

    def to_dict2(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "channel_id": self.channel_id,
            "message": self.message,
            "sender_id": self.sender.id,
            "sender_nickname": self.sender.nickname,
            "role": self.sender.role,
            "display_pic": self.sender.user.display_pic,
        }
