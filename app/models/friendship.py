from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friendship(db.Model):
    __tablename__ = "friendships_table"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users_table.id")), nullable=False
    )
    friend_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users_table.id")), nullable=False
    )
    role = db.Column(db.String(64), nullable=False)

    # friendships = db.relationship("User", back_populates="friendships")
    # direct_messages = db.relationship(
    #     "DirectMessage", back_populates="friendship", cascade="all, delete-orphan"
    # )


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "friend_id": self.friend_id,
            "role": self.role,
        }
