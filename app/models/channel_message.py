from .db import db, environment, SCHEMA


class ChannelMessage(db.Model):
    __tablename__ = "channel_messages"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, nullable=True)
    channel_id = db.Column(db.Integer, nullable=True)
    message = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "channel_id": self.channel_id,
            "message": self.message,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
