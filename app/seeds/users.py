from app.models import db, User, environment, SCHEMA
from faker import Faker
from random import choice

faker = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="gotmilk@gmail.com",
        password="password",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/demo.png",
        theme="dark",
    )
    Wasiq = User(
        email="wasiq@gmail.com",
        username="FatalBanana",
        password="password",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/fatalbanana.png",
        theme="dark",
    )
    Fahd = User(
        email="fahd@gmail.com",
        username="Dhaf",
        password="password",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/dahf.png",
        theme="dark",
    )
    Peter = User(
        email="peter@gmail.com",
        username="ipetpandas",
        password="password",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/residentevil.png",
        theme="dark",
    )
    Keenly = User(
        email="keenly@gmail.com",
        username="Chanyeol",
        password="password",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/cowwig.png",
        theme="dark",
    )
    six = User(
        email="jimjam@gmail.com",
        username="jimothy",
        password="password2",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/jimjam.png",
        theme="dark",
    )
    seven = User(
        email="dwigt@gmail.com",
        username="dwigt",
        password="password2",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/dwight.png",
        theme="dark",
    )
    eight = User(
        email="fireguy@gmail.com",
        username="thefireguy",
        password="password2",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/fireguy.png",
        theme="dark",
    )
    nine = User(
        email="bestboss@gmail.com",
        username="agentscarn",
        password="password2",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/mscott.png",
        theme="dark",
    )
    Obi_Wan = User(
        email="obiwan@gmail.com",
        username="Obi-Wan",
        password="password",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/obiwan.png",
        theme="dark",
    )
    Anakin = User(
        email="anakin@gmail.com",
        username="Anakin",
        password="password",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/anakin.png",
        theme="dark",
    )
    Burnt_Anakin = User(
        email="burntanakin@gmail.com",
        username="BurntAnakin",
        password="password",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/burntanakin.png",
        theme="dark",
    )
    pending = User(
        email="karma@gmail.com",
        username="karma",
        password="password3",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/yingyang.png",
        theme="dark",
    )
    pending2 = User(
        email="choco@gmail.com",
        username="choco",
        password="password3",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/choco.png",
        theme="dark",
    )
    m1 = User(
        email="supa@gmail.com",
        username="supadupa",
        password="password4",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/supaman.png",
        theme="dark",
        mootro="mootro"
    )
    m2 = User(
        email="darkknight@gmail.com",
        username="geniusinabottle",
        password="password4",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/batman.png",
        theme="dark",
    )

    main = User(
        email="discord@discord.com",
        username="JohnWick",
        password="password123",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/johnwick.png",
        theme="dark",
    )

    Messi = User(
        email="Messi@goat.com",
        username="LionelMessi",
        password="Ba4celona",
        display_pic="https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/messi.png",
        theme="dark",
    )

    db.session.add_all(
        [
            demo,
            Wasiq,
            Fahd,
            Peter,
            Keenly,
            six,
            seven,
            eight,
            nine,
            Obi_Wan,
            Anakin,
            Burnt_Anakin,
            pending,
            pending2,
            m1,
            m2,
            main,
            Messi,
        ]
    )
    db.session.commit()

    pics = [
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/1.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/11.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/2.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/4.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/5.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/6.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/7.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/adele.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/beckham.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/bensavage1.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/bradpitt.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/brunomars.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/cardib.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/chrisrock.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/demilovato.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/dom.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/gates.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/hanks.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/hermoine.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/jackson.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/jayz.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/jeffbezos.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/karliekloss.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/kekepalmer.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/kellyrowland.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/kiernanshipka.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/kobe.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/lindsaylohan.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/louisck.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/oprah-1.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/postmalone.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/potter.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/rock.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/selena.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/sheeran.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/tomholland.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/willsmith.png",
        "https://wr-test-bucket-1.s3.amazonaws.com/user+seeds/8.png",
    ]
    opt = list(range(99))
    for _ in range(12):
        temp = User(
            email=f"{faker.text(max_nb_chars=6)}{choice(opt)}@{faker.text(max_nb_chars=5)}com",
            username=f"{faker.text(max_nb_chars=10)[:-1]}{choice(opt)}",
            password="password",
            display_pic=choice(pics),
            theme="dark",
        )
        db.session.add(temp)
    db.session.commit

    opt = list(range(99))
    for _ in range(9):
        temp = User(
            email=f"{faker.text(max_nb_chars=6)}{choice(opt)}@{faker.text(max_nb_chars=5)}com",
            username=f"{faker.text(max_nb_chars=10)[:-1]}{choice(opt)}",
            password="password",
            display_pic=choice(pics),
            theme="dark",
            mootro="mootro"
        )
        db.session.add(temp)
    db.session.commit


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
