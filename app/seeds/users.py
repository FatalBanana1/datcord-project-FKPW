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
    six = User(
        email="jimjam@gmail.com",
        username="jimothy",
        password="password2",
        display_pic="https://www.denofgeek.com/wp-content/uploads/2021/10/Jim-The-Office-John-Krasinski.jpg?resize=768%2C432",
        theme="dark",
    )
    seven = User(
        email="dwigt@gmail.com",
        username="dwigt",
        password="password2",
        display_pic="https://i.pinimg.com/originals/82/52/94/825294e09c5e6eed6fcaa5354f47c2a8.jpg",
        theme="dark",
    )
    eight = User(
        email="fireguy@gmail.com",
        username="thefireguy",
        password="password2",
        display_pic="https://cdn.mos.cms.futurecdn.net/4MwySDFfBLtYvJTk4VZkVh.jpg",
        theme="dark",
    )
    nine = User(
        email="bestboss@gmail.com",
        username="agentscarn",
        password="password2",
        display_pic="https://www.looper.com/img/gallery/the-offices-michael-scott-was-almost-a-murderer/intro-1591207215.jpg",
        theme="dark",
    )
    Obi_Wan = User(
        email="obiwan@gmail.com",
        username="Obi-Wan",
        password="password",
        display_pic="https://i.guim.co.uk/img/media/8a36c17d2c101a4b6bf2c2ead340c3c703784be0/0_1425_2216_1330/master/2216.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=571ac94d27bbfeb1476227c3d2c7fea9",
        theme="dark",
    )
    Anakin = User(
        email="anakin@gmail.com",
        username="Anakin",
        password="password",
        display_pic="https://thenerdstash.com/wp-content/uploads/2021/10/Hayden-Christensen-Anakin-Skywalker.jpg",
        theme="dark",
    )

    db.session.add_all([demo, Wasiq, Fahd, Peter, Keenly, six, seven, eight, nine, Obi_Wan, Anakin])
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
