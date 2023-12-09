from flask import Blueprint, jsonify, session, request, url_for, aobrt
from app.models import User, Post, PostImage

from app.forms.post_form import PostForm
from flask_login import current_user, login_required
from sqlalchemy import func, desc
from sqlalchemy.orm import joinedload

post_routes = Blueprint('posts', __name__)

# Get All Posts
@post_routes.route('/', methods= ['GET'])
def get_all_posts():
  posts = Post.query.all()

  allPosts = []

  for post in posts:

    post_data = {
      'id': post.id,
      'title': post.title,
      'body': post.body,
      'user_id': post.user_id,
      'created_at': post.created_at,
      'updated_at': post.updated_at
    }
    allPosts.append(post_data)

  return jsonify({"Posts": allPosts})

# Get all Posts by User
@post_routes.route('/current-user', methods=['GET'])
@login_required
def get_posts_by_user_id():
  posts_by_user = Post.query.filter_by(user_id=current_user.id).order_by(desc(Post.created_at)).all()

  if not posts_by_user:
    return jsonify({"message": "You have not created any posts"})

  return jsonify({"UserAllPosts": posts_by_user})

# Get Posts by postId
@post_routes.route('/<int:post_id>', methods=['GET'])
def get_post_by_id(post_id):
  post_info = Post.query.get(post_id)

  if not post_info:
    return jsonify({"message": f"Post couldn't be found"}), 404

  post_all_info = {
      'id': post_info.id,
      'title': post_info.title,
      'body': post_info.body,
      'user_id': post_info.user_id,
      'created_at': post_info.created_at,
      'updated_at': post_info.updated_at
    }

  return jsonify({"Posts_all_details": post_all_info})

# create new post
@post_routes.route('/', methods=['POST'])
@login_required
def create_new_post():
