from app.models import db, ServerMember, environment, SCHEMA


def seed_server_members():
    member1 = ServerMember(
        user_id=1, server_id=8, nickname="Sir Demolition", role="owner"
    )

    member2 = ServerMember(
        user_id=2, server_id=8, nickname="Legen-Dairy", role="member"
    )

    member3 = ServerMember(user_id=3, server_id=8, nickname="Dragon-Lord", role="admin")

    member4 = ServerMember(
        user_id=4, server_id=8, nickname="Udder Chaos", role="member"
    )

    member5 = ServerMember(
        user_id=5, server_id=8, nickname="Lawn Moo-er", role="pending"
    )

    member6 = ServerMember(user_id=3, server_id=2, nickname="Dhaaaaf", role="owner")

    member7 = ServerMember(user_id=2, server_id=3, nickname="FatalBanana", role="owner")

    member8 = ServerMember(user_id=4, server_id=4, nickname="Meow Meow", role="owner")

    member9 = ServerMember(user_id=5, server_id=5, nickname="Boba", role="owner")

    member10 = ServerMember(user_id=1, server_id=7, nickname="Demo", role="owner")

    member11 = ServerMember(user_id=1, server_id=2, nickname="Demo King", role="member")

    member12 = ServerMember(user_id=2, server_id=2, nickname="Fatal", role="member")

    member13 = ServerMember(user_id=1, server_id=6, nickname="Demo", role="owner")
    m14 = ServerMember(user_id=1, server_id=1, nickname="Sir Demo", role="member")
    m15 = ServerMember(user_id=2, server_id=1, nickname="Fatality", role="member")
    m16 = ServerMember(user_id=3, server_id=1, nickname="FDA", role="admin")
    m17 = ServerMember(user_id=4, server_id=1, nickname="SadPanda", role="member")
    m18 = ServerMember(user_id=5, server_id=1, nickname="K", role="member")
    m19 = ServerMember(user_id=6, server_id=1, nickname="Jimothy", role="member")
    m20 = ServerMember(user_id=7, server_id=1, nickname="Dwigt", role="admin")
    m21 = ServerMember(user_id=8, server_id=1, nickname="thefireguy", role="member")
    m22 = ServerMember(user_id=9, server_id=1, nickname="AgentScarn", role="owner")
    m23 = ServerMember(user_id=10, server_id=2, nickname="WanAndOnly", role="admin")
    m24 = ServerMember(user_id=11, server_id=2, nickname="ChosenOne", role="member")
    m25 = ServerMember(user_id=5, server_id=2, nickname="Chanyeol", role="member")
    m26 = ServerMember(user_id=4, server_id=2, nickname="Panda", role="member")
    m27 = ServerMember(
        user_id=12, server_id=2, nickname="BurntChosenOne", role="member"
    )
    m28 = ServerMember(user_id=3, server_id=3, nickname="Dhaaf", role="admin")
    m29 = ServerMember(user_id=3, server_id=4, nickname="Dhaaf", role="admin")
    m30 = ServerMember(user_id=3, server_id=5, nickname="Dhaaf", role="admin")
    m31 = ServerMember(user_id=3, server_id=6, nickname="Dhaaf", role="admin")
    m32 = ServerMember(user_id=3, server_id=7, nickname="Dhaaf", role="admin")
    m33 = ServerMember(user_id=13, server_id=8, nickname="badkarma", role="pending")
    m34 = ServerMember(user_id=13, server_id=2, nickname="badkarma", role="pending")
    m35 = ServerMember(user_id=13, server_id=3, nickname="badkarma", role="pending")
    m36 = ServerMember(user_id=13, server_id=4, nickname="badkarma", role="pending")
    m37 = ServerMember(user_id=13, server_id=5, nickname="badkarma", role="pending")
    m38 = ServerMember(user_id=13, server_id=6, nickname="badkarma", role="pending")
    m39 = ServerMember(user_id=13, server_id=7, nickname="badkarma", role="pending")
    m40 = ServerMember(user_id=13, server_id=1, nickname="badkarma", role="pending")
    m41 = ServerMember(user_id=14, server_id=8, nickname="chocoloco", role="pending")
    m42 = ServerMember(user_id=14, server_id=2, nickname="chocoloco", role="pending")
    m43 = ServerMember(user_id=14, server_id=3, nickname="chocoloco", role="pending")
    m44 = ServerMember(user_id=14, server_id=4, nickname="chocoloco", role="pending")
    m45 = ServerMember(user_id=14, server_id=5, nickname="choco", role="pending")
    m46 = ServerMember(user_id=14, server_id=6, nickname="choco", role="pending")
    m47 = ServerMember(user_id=14, server_id=7, nickname="choco", role="pending")
    m48 = ServerMember(user_id=14, server_id=1, nickname="choco", role="pending")
    m49 = ServerMember(user_id=15, server_id=1, nickname="supadupa", role="member")
    m50 = ServerMember(user_id=15, server_id=2, nickname="supadupa", role="member")
    m51 = ServerMember(user_id=15, server_id=3, nickname="supadupa", role="member")
    m52 = ServerMember(user_id=15, server_id=4, nickname="supadupa", role="member")
    m53 = ServerMember(user_id=15, server_id=5, nickname="supadupa", role="member")
    m54 = ServerMember(user_id=15, server_id=6, nickname="supadupa", role="member")
    m55 = ServerMember(user_id=15, server_id=7, nickname="supadupa", role="member")
    m56 = ServerMember(user_id=15, server_id=8, nickname="supadupa", role="member")

    m57 = ServerMember(user_id=16, server_id=1, nickname="genius", role="member")
    m58 = ServerMember(user_id=16, server_id=2, nickname="genius", role="member")
    m59 = ServerMember(user_id=16, server_id=3, nickname="genius", role="member")
    m60 = ServerMember(user_id=16, server_id=4, nickname="genius", role="member")
    m61 = ServerMember(user_id=16, server_id=5, nickname="genius", role="member")
    m62 = ServerMember(user_id=16, server_id=6, nickname="genius", role="member")
    m63 = ServerMember(user_id=16, server_id=7, nickname="genius", role="member")
    m64 = ServerMember(user_id=16, server_id=8, nickname="genius", role="member")
    m65 = ServerMember(user_id=16, server_id=9, nickname="genius", role="member")
    m66 = ServerMember(user_id=15, server_id=9, nickname="supadupa", role="member")
    m67 = ServerMember(user_id=14, server_id=9, nickname="choco", role="pending")
    m68 = ServerMember(user_id=13, server_id=9, nickname="badkarma", role="pending")

    m69 = ServerMember(user_id=17, server_id=1, nickname="johnwick", role="admin")
    m70 = ServerMember(user_id=17, server_id=2, nickname="johnwick", role="admin")
    m71 = ServerMember(user_id=17, server_id=3, nickname="johnwick", role="admin")
    m72 = ServerMember(user_id=17, server_id=4, nickname="johnwick", role="admin")
    m73 = ServerMember(user_id=17, server_id=5, nickname="johnwick", role="admin")
    m74 = ServerMember(user_id=17, server_id=6, nickname="johnwick", role="admin")
    m75 = ServerMember(user_id=17, server_id=7, nickname="johnwick", role="admin")
    m76 = ServerMember(user_id=17, server_id=8, nickname="johnwick", role="admin")
    m77 = ServerMember(user_id=17, server_id=9, nickname="johnwick", role="owner")

    m78 = ServerMember(user_id=1, server_id=9, nickname="Sir Demo", role="member")
    m79 = ServerMember(user_id=2, server_id=9, nickname="naners", role="admin")
    m80 = ServerMember(user_id=12, server_id=9, nickname="toasty", role="admin")
    m81 = ServerMember(user_id=3, server_id=9, nickname="Dhaaaf", role="member")
    m82 = ServerMember(user_id=4, server_id=9, nickname="pandas", role="admin")
    m83 = ServerMember(user_id=5, server_id=9, nickname="Chanyeol", role="member")
    m84 = ServerMember(user_id=6, server_id=9, nickname="jimjam", role="member")
    m85 = ServerMember(user_id=7, server_id=9, nickname="dwight", role="member")
    m86 = ServerMember(user_id=8, server_id=9, nickname="thefireguy", role="member")
    m87 = ServerMember(user_id=9, server_id=9, nickname="agentscarn", role="member")
    m88 = ServerMember(user_id=10, server_id=9, nickname="WanAndOnly", role="member")
    m89 = ServerMember(user_id=11, server_id=9, nickname="ChosenOne", role="member")
    m90 = ServerMember(user_id=17, server_id=10, nickname="johnwick", role="owner")

    db.session.add_all(
        [
            member1,
            member2,
            member3,
            member4,
            member5,
            member6,
            member7,
            member8,
            member9,
            member10,
            member11,
            member12,
            member13,
            m14,
            m15,
            m16,
            m17,
            m18,
            m19,
            m20,
            m21,
            m22,
            m23,
            m24,
            m25,
            m26,
            m27,
            m28,
            m29,
            m30,
            m31,
            m32,
            m33,
            m34,
            m35,
            m36,
            m37,
            m38,
            m39,
            m40,
            m41,
            m42,
            m43,
            m44,
            m45,
            m46,
            m47,
            m48,
            m49,
            m50,
            m51,
            m52,
            m53,
            m54,
            m55,
            m56,
            m57,
            m58,
            m59,
            m60,
            m61,
            m62,
            m63,
            m64,
            m64,
            m65,
            m66,
            m67,
            m68,
            m69,
            m70,
            m71,
            m72,
            m73,
            m74,
            m75,
            m76,
            m77,
            m78,
            m79,
            m81,
            m82,
            m83,
            m84,
            m85,
            m86,
            m87,
            m88,
            m89,
            m80,
            m90,
        ]
    )
    db.session.commit()


def undo_server_members():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.server_members_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM server_members_table")

    db.session.commit()
