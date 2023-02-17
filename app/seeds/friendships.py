from app.models import db, Friendship, environment, SCHEMA


def seed_friendships():
    f1 = Friendship(user_id=3, friend_id=1, role="friend")
    f22 = Friendship(user_id=3, friend_id=14, role="friend")
    f2 = Friendship(user_id=3, friend_id=2, role="friend")
    f3 = Friendship(user_id=3, friend_id=4, role="friend")
    f4 = Friendship(user_id=3, friend_id=5, role="friend")
    f5 = Friendship(user_id=17, friend_id=1, role="friend")
    f6 = Friendship(user_id=17, friend_id=2, role="friend")
    f7 = Friendship(user_id=17, friend_id=3, role="friend")
    f8 = Friendship(user_id=17, friend_id=4, role="friend")
    f9 = Friendship(user_id=17, friend_id=5, role="friend")
    f10 = Friendship(user_id=17, friend_id=6, role="friend")
    f11 = Friendship(user_id=17, friend_id=7, role="friend")
    f12 = Friendship(user_id=17, friend_id=8, role="friend")
    f13 = Friendship(user_id=17, friend_id=9, role="friend")
    f14 = Friendship(user_id=17, friend_id=10, role="friend")
    f15 = Friendship(user_id=17, friend_id=11, role="friend")
    f16 = Friendship(user_id=17, friend_id=12, role="friend")
    f17 = Friendship(user_id=17, friend_id=13, role="friend")
    f18 = Friendship(user_id=17, friend_id=14, role="friend")
    f19 = Friendship(user_id=17, friend_id=15, role="friend")
    f20 = Friendship(user_id=17, friend_id=16, role="friend")
    f21 = Friendship(user_id=17, friend_id=18, role="friend")
    f23 = Friendship(user_id=3, friend_id=18, role="friend")

    db.session.add_all(
        [
            f1,
            f22,
            f2,
            f3,
            f4,
            f5,
            f6,
            f7,
            f8,
            f9,
            f10,
            f11,
            f12,
            f13,
            f14,
            f15,
            f16,
            f17,
            f18,
            f19,
            f20,
            f21,
            f23,
        ]
    )
    db.session.commit()


def undo_friendships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friendships_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM friendships_table")

    db.session.commit()
