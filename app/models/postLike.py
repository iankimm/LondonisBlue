from .db import db, environment, SCHEMA, add_prefix_for_prod

class PostLike(db.Model):
  __tablename__ = "postLikes"

  # check if environment == production and sets schema
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, autoincrement=True, primary_key=True)

  # relationships
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  user = db.relationship("User", back_populates="likes")

  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))

  post = db.relationship("Post", back_populates="likes")

  def to_dict(self):
    return{
      'id': self.id,
      'user_id': self.user_id,
      'post_id': self.post_id
    }
