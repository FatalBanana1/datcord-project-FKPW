from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class DirectMessage(db.Model):
    __tablename__ = "direct_messages_table"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users_table.id")),
        nullable=False,
    )
    friendship_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("friendships_table.id")),
        nullable=False,
    )
    message = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    sender = db.relationship("User", back_populates="direct_messages")
    friendship = db.relationship("Friendship", back_populates="direct_messages")

    def to_dict(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "friendship_id": self.friendship_id,
            "message": self.message,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "sender_id": self.sender.id,
            "sender_nickname": self.sender.username,
            "role": self.friendship.role,
            "display_pic": self.sender.display_pic,
        }

    def to_dict2(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "friendship_id": self.friendship_id,
            "message": self.message,
            "sender_id": self.sender.id,
            "sender_nickname": self.sender.username,
            "display_pic": self.sender.display_pic,
        }
