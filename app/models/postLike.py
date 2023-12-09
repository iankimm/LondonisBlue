from .db import db, environment, SCHEMA, add_prefix_for_prod

class PostLike(db.Model):
  __tablename__ = "postlikes"

  # check if environment == production and sets schema
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, autoincrement=True, primary_key=True)

  # relationships
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  user = db.relationship("User", back_populates="postlikes")

  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))

  posts = db.relationship("Post", back_populates="postlikes")

  def to_dict(self):
    return{
      'id': self.id,
      'user_id': self.user_id,
      'post_id': self.post_id
    }
