from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Channel(db.Model):
    __tablename__ = "channels_table"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    server_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("servers_table.id")),
        nullable=False,
    )
    category = db.Column(db.String, nullable=False)
    is_private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    server = db.relationship("Server", back_populates="channels")
    channel_messages = db.relationship(
        "ChannelMessage", back_populates="channel", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "server_id": self.server_id,
            "category": self.category,
            "is_private": self.is_private,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "server": self.server.to_dict2(),
        }
