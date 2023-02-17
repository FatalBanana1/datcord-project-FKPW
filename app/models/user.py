from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .friendship import Friendship


class User(db.Model, UserMixin):
    __tablename__ = "users_table"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    display_pic = db.Column(
        db.String,
        nullable=False,
        default="https://cdn.discordapp.com/attachments/1030261089168015532/1073712325409902632/datcord_logo_png.png",
    )
    theme = db.Column(db.String, nullable=False, default="dark")
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    servers = db.relationship("Server", back_populates="owner")
    server_memberships = db.relationship(
        "ServerMember", back_populates="user", cascade="all, delete-orphan"
    )

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
        friendships = db.relationship(
            "User",
            secondary=f"{SCHEMA}.friendships_table",
            primaryjoin=(id == Friendship.user_id),
            secondaryjoin=(id == Friendship.friend_id),
        )
        friendships2 = db.relationship(
            "User",
            secondary=f"{SCHEMA}.friendships_table",
            primaryjoin=(id == Friendship.friend_id),
            secondaryjoin=(id == Friendship.user_id),
        )


    if environment != "production":
        friendships = db.relationship(
            "User",
            secondary="friendships_table",
            primaryjoin=(id == Friendship.user_id),
            secondaryjoin=(id == Friendship.friend_id),
        )
        friendships2 = db.relationship(
            "User",
            secondary="friendships_table",
            primaryjoin=(id == Friendship.friend_id),
            secondaryjoin=(id == Friendship.user_id),
        )

    direct_messages = db.relationship(
        "DirectMessage", back_populates="sender", cascade="all, delete-orphan"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "theme": self.theme,
            "display_pic": self.display_pic,
            "created_at": self.created_at,
            "server_members": [sm.to_dict() for sm in self.server_memberships],
        }
