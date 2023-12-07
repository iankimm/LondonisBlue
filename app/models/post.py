from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

from .user import User

class Post(db.Model):
  __tablename__ = "posts"

  # check if environment == production and sets schema
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  # items
  id = db.Column(db.Integer, autoincrement=True, primary_key=True)
  title = db.Column(db.String, nullable=False)
  body = db.Column(db.String, nullable=False)
  imageUrl = db.Column(db.String, nullable=True)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  # relationship
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  user = db.relationship("User", back_populates="posts")

  # relationship connection
  comment = db.relationship('Comment', back_populates='posts', cascade='all, delete-orphan')

  # output
  def to_dict(self):
    return{
      'id': self.id,
      'title': self.title,
      'imageUrl': self.imageUrl,
      'body': self.body,
      'created_at': self.created_at
    }
