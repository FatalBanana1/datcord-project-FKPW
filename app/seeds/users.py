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
        display_pic="https://wallpapers.com/images/hd/sebastian-vettel-red-textured-background-bnjujnpd4jy06cij.jpg",
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
    Burnt_Anakin = User(
        email="burntanakin@gmail.com",
        username="BurntAnakin",
        password="password",
        display_pic="https://i.imgflip.com/1jklzc.jpg?a465192",
        theme="dark",
    )
    pending = User(
        email="karma@gmail.com",
        username="karma",
        password="password3",
        display_pic="https://www.artofliving.org/sites/www.artofliving.org/files/styles/original_image/public/wysiwyg_imageupload/karma_4.jpg?itok=uKx-_qpW",
        theme="dark",
    )
    pending2 = User(
        email="choco@gmail.com",
        username="choco",
        password="password3",
        display_pic="https://milkandpop.com/wp-content/uploads/2020/11/mocha-latte-13-720x720.jpg",
        theme="dark",
    )
    m1 = User(
        email="supa@gmail.com",
        username="supadupa",
        password="password4",
        display_pic="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/10/20/16662224157675.jpg",
        theme="dark",
    )
    m2 = User(
        email="darkknight@gmail.com",
        username="geniusinabottle",
        password="password4",
        display_pic="https://image.cnbcfm.com/api/v1/image/105814861-1553608877209ben-affleck-batman-1.jpg?v=1553609938&w=929&h=523&vtcrop=y",
        theme="dark",
    )

    main = User(
        email="discord@discord.com",
        username="JohnWick",
        password="password123",
        display_pic="https://avatarfiles.alphacoders.com/203/203174.jpg",
        theme="dark",
    )

    Messi = User(
        email="Messi@goat.com",
        username="LionelMessi",
        password="Ba4celona",
        display_pic="https://i.dailymail.co.uk/1s/2023/02/16/00/67737607-11756461-image-a-1_1676506718526.jpg",
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
        "https://pyxis.nymag.com/v1/imgs/e0a/79c/5671d6e6089515f706e9b2288d41d9e824-you-people.2x.rsocial.w600.jpg",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/actor-will-smith-arrives-at-the-los-angeles-world-premiere-news-photo-465783654-1565089503.jpg",
        "https://zanderm.com/wp-content/uploads/2016/09/Fwd-1zan0-Famous-People-With-Vitiligo-sal-jxtgroup.com-JXT-Group-Mail.png",
        "https://www.discoverwalks.com/blog/wp-content/uploads/2022/01/776px-tom_hanks_tiff_2019.jpg",
        "https://people.com/thmb/w0KomSJmqc7XqlwbbsOkD7xKrFw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/daniel-radcliffe1-a80672060fc14e188e89f9c1a60bfeea.jpg",
        "https://www.who.com.au/media/30290/gettyimages-1125335767.jpg",
        "https://netstorage-briefly.akamaized.net/images/1ba932325b69b595.jpg?imwidth=900",
        "https://blog.ongig.com/wp-content/uploads/2020/06/Tom_Holland_by_Gage_Skidmore.jpg",
        "https://media.cnn.com/api/v1/images/stellar/prod/140110093710-louis-ck-0110.jpg?q=w_3000,h_2282,x_0,y_0,c_fill/w_1280",
        "https://i.iheart.com/v3/re/new_assets/62169ce9e23615b559ea3cd3?ops=contain(1480,0)",
        "https://cdn.ebaumsworld.com/mediaFiles/picture/604025/86918033.jpg",
        "https://www.wonderwall.com/wp-content/uploads/sites/2/2021/09/shutterstock_editorial_12241104ao.jpg?h=800",
        "https://d3itoy3ehuwt5n.cloudfront.net/wp-content/uploads/2014/07/bill-gates.jpg?w=225",
        "https://www.thefamouspeople.com/cdn-cgi/mirage/608bed817c49109225caf1dc14ffdea6b7fad539a91cd9b212f06f34116d3e8e/1280/https://www.thefamouspeople.com/profiles/thumbs/kobe-bryant-2.jpg",
        "https://images.prestigeonline.com/wp-content/uploads/sites/8/2022/12/06162509/famous-people-celebrities-david-beckham-born-year-of-the-rabbit.jpeg",
    ]
    opt = list(range(99))
    for _ in range(20):
        temp = User(
            email=f"{faker.text(max_nb_chars=6)}{choice(opt)}@{faker.text(max_nb_chars=5)}com",
            username=f"{faker.text(max_nb_chars=10)[:-1]}{choice(opt)}",
            password="password",
            display_pic=choice(pics),
            theme="dark",
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
