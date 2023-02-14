from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Server(db.Model):
    __tablename__ = "servers_table"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users_table.id")), nullable=False
    )
    icon_url = db.Column(
        db.String,
        default="https://cdn.discordapp.com/attachments/1030261089168015532/1073712325409902632/datcord_logo_png.png",
        nullable=False,
    )
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    owner = db.relationship("User", back_populates="servers")
    channels = db.relationship(
        "Channel", back_populates="server", cascade="all, delete-orphan"
    )
    server_members = db.relationship(
        "ServerMember", back_populates="server", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "owner_id": self.owner_id,
            "icon_url": self.icon_url,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "channels": [channel.to_dict() for channel in self.channels],
        }
