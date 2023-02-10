from .db import db, environment, SCHEMA


class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, nullable=False)
    icon_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    # server_members = db.relationship(
    #     "ServerMember", back_populates="server", cascade="all, delete-orphan"
    # )

    # def to_dict(self, with_server_members=False):
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "owner_id": self.owner_id,
            "icon_url": self.icon_url,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            # "server_members": [sm.id for sm in self.server_members]
            # if with_server_members
            # else [],
        }
