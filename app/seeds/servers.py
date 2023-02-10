from app.models import db, Server, environment, SCHEMA
from datetime import datetime


def seed_servers():
    python = Server(
        name="Python",
        owner_id="1",
        icon_url="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png",
        description="Server for Python.",
        created_at=datetime(2023, 1, 1),
        updated_at=datetime(2023, 1, 1),
    )
    javascript = Server(
        name="Javascript",
        owner_id="1",
        icon_url="https://vegibit.com/wp-content/uploads/2014/04/Javascript-JS.png",
        description="Server for Javascript.",
        created_at=datetime(2023, 1, 1),
        updated_at=datetime(2023, 1, 1),
    )
    db.session.add(python)
    db.session.add(javascript)
    db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()
