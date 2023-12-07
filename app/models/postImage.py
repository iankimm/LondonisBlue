from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class PostImage(db.Model):
  __tablename__ = "postImages"

  # check if environment == production and sets schema
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  # items
  id = db.Column(db.Integer, autoincrement=True, primary_key=True)
  imageUrl = db.Column(db.String, nullable=True)

  # relationship
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  user = db.relationship("User", back_populates="posts")

  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))

  post = db.relationship("Post", back_populates="posts")

  # output
  def to_dict(self):
    return{
      'id': self.id,
      'imageUrl': self.imageUrl
    }
