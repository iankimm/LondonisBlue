from app.models import db, PostLike, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data.post_like_data import post_likes_data



# Adds a demo user, you can add other users here if you want
def seed_postLikes():

    for like in post_likes_data:
        seed_post = PostLike(
            user_id = like['user_id'],
            post_id = like['post_id'],
        )
        db.session.add(seed_post)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_postLikes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.postLikes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM postLikes"))

    db.session.commit()
