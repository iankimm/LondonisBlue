from .db import db, environment, SCHEMA, add_prefix_for_prod

class CommentLike(db.Model):
  __tablename__ = "commentlikes"

  # check if environment == production and sets schema
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, autoincrement=True, primary_key=True)

  # relationships
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  user = db.relationship("user", back_populates="commentlikes")

  comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))

  comment = db.relationship("comment", back_populates="commentlikes")

  def to_dict(self):
    return{
      'id': self.id,
      'user_id': self.user_id,
      'comment_id': self.comment_id
    }
