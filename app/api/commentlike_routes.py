from flask import Blueprint, jsonify, session, request, url_for, aobrt
from app.models import User, Post, PostImage, PostLike, Comment, CommentLike, db

from flask_login import current_user, login_required
from sqlalchemy import func, desc
from sqlalchemy.orm import joinedload

commentlike_routes = Blueprint('commentlikes', __name__)


# create a post like
@commentlike_routes.route('/<int:comment_id>/likes', methods=['POST'])
@login_required
def create_post_like(comment_id):
  comment = Comment.query.get(comment_id)
  commentlikes = CommentLike.query.all()

  if not comment:
    return jsonify({"message": f"Comment not found."}), 404

  if comment.user_id == current_user.id:
    return jsonify({"message": f"Comment owner can't like your own."}), 403

  for commentlike in commentlikes:
    if commentlike.user_id == current_user.id and commentlike.comment_id == comment_id:
      return jsonify({"message": f"user liked this post already"}), 403

  new_commentlike = CommentLike(
    user_id = current_user.id,
    comment_id = comment_id
  )

  db.session.add(new_commentlike)
  db.session.commit()

  return jsonify(new_commentlike.to_dict())


# delete a post like
@commentlike_routes.route('/<int:commentlike_id>/likes', methods=['DELETE'])
@login_required
def delete_post_like(commentlike_id):
  commentlike = PostLike.query.get(commentlike_id)

  if not commentlike:
    return jsonify({"message": f"CommentLike not found."}), 404

  if commentlike.user_id == current_user.id:
    db.session.delete(commentlike)
    db.session.commit()
    return jsonify({"message": "Comment like deleted."}), 200

  return jsonify({'message': "forbidden"}), 403
