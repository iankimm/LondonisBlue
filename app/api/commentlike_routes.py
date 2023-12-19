from flask import Blueprint, jsonify, session, request, url_for, aobrt
from app.models import User, Post, PostImage, PostLike, Comment, CommentLike, db

from flask_login import current_user, login_required
from sqlalchemy import func, desc
from sqlalchemy.orm import joinedload

commentlike_routes = Blueprint('commentlikes', __name__)

# get commentlike
@commentlike_routes.route('/', methods=['GET'])
def get_all_commentlikes():
  commentlikes = CommentLike.query.all()

  allCommentLikes = []

  for commentlike in commentlikes:
    data = {
      'id': commentlike.id,
      'user_id': commentlike.user_id,
      'comment_id': commentlike.comment_id
    }

    allCommentLikes.append(data)

  return jsonify({"Commentlikes": allCommentLikes})

# create a comment like
@commentlike_routes.route('/<int:comment_id>/likes', methods=['POST'])
@login_required
def create_comment_like(comment_id):
  comment = Comment.query.get(comment_id)
  commentlikes = CommentLike.query.all()

  if not comment:
    return jsonify({"message": f"Comment not found."}), 404

  if comment.user_id == current_user.id:
    return jsonify({"message": f"Comment owner can't like your own."}), 403

  for commentlike in commentlikes:
    if commentlike.user_id == current_user.id and commentlike.comment_id == comment_id:
      return jsonify({"message": f"user liked this comment already"}), 403

  new_commentlike = CommentLike(
    user_id = current_user.id,
    comment_id = comment_id
  )

  db.session.add(new_commentlike)
  db.session.commit()

  return jsonify(new_commentlike.to_dict())


# delete a comment like
@commentlike_routes.route('/<int:commentlike_id>/likes', methods=['DELETE'])
@login_required
def delete_comment_like(commentlike_id):
  commentlike = CommentLike.query.get(commentlike_id)

  if not commentlike:
    return jsonify({"message": f"CommentLike not found."}), 404

  if commentlike.user_id == current_user.id:
    db.session.delete(commentlike)
    db.session.commit()
    return jsonify({"message": "Comment like deleted."}), 200

  return jsonify({'message': "forbidden"}), 403
