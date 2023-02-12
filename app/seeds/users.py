from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="gotmilk@gmail.com",
        password="password",
        display_pic="https://upload.wikimedia.org/wikipedia/commons/7/7e/Appacademylogo.png",
        theme="dark",
    )
    Wasiq = User(
        email="wasiq@gmail.com",
        username="FatalBanana",
        password="password",
        display_pic="https://cdn.discordapp.com/attachments/1072278458589261954/1073677188693491762/fatalbanana_icon.png",
        theme="dark",
    )
    Fahd = User(
        email="fahd@gmail.com",
        username="Dhaf",
        password="password",
        display_pic="https://i.kym-cdn.com/photos/images/newsfeed/001/141/172/ed1.jpg",
        theme="dark",
    )
    Peter = User(
        email="peter@gmail.com",
        username="ipetpandas",
        password="password",
        display_pic="https://i.pinimg.com/originals/f9/8e/56/f98e56072c2b5126f3bdbe2670c94019.jpg",
        theme="dark",
    )
    Keenly = User(
        email="keenly@gmail.com",
        username="Chanyeol",
        password="password",
        display_pic="https://www.gannett-cdn.com/-mm-/a28f7c422913d53666c847a3f95ced5d21cb7ce7/c=0-73-620-423/local/-/media/JacksonMS/TheBuzz/2014/06/12//1402610128000-Cows-in-Wigs.JPG",
        theme="dark",
    )

    db.session.add_all([demo, Wasiq, Fahd, Peter, Keenly])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM users_table")

    db.session.commit()
