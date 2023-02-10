from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ServerMember(db.Model):
    __tablename__ = "server_members_table"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users_table.id')), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers_table.id')), nullable=False)
    nickname = db.Column(db.String(64), nullable=False)
    role = db.Column(db.String(64), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = db.relationship('User', back_populates='server_memberships')
    server = db.relationship('Server', back_populates='server_members')
    channel_messages = db.relationship("ChannelMessage", back_populates="sender")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "server_id": self.server_id,
            "nickname": self.nickname,
            "role": self.role,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
