from app.models import db, Friendship, environment, SCHEMA


def seed_users():
    f1 = Friendship(user_id=3, friend_id=1, role="friend")
    f2 = Friendship(user_id=3, friend_id=2, role="friend")
    f3 = Friendship(user_id=3, friend_id=4, role="friend")
    f4 = Friendship(user_id=3, friend_id=5, role="friend")

    db.session.add_all([f1, f2, f3, f4])
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friendships_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM friendships_table")

    db.session.commit()
