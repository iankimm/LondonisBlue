from flask import Blueprint, jsonify, session, request, url_for
from app.models import User, Post, PostImage, db

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

  allPostsByUser = []

  for post in posts_by_user:
    post_data = {
      'id': post.id,
      'title': post.title,
      'body': post.body,
      'user_id': post.user_id,
      'created_at': post.created_at,
      'updated_at': post.updated_at
    }
    allPostsByUser.append(post_data)

  return jsonify({"UserAllPosts": allPostsByUser})

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
# @login_required
def create_new_post():
  data = request.get_json()

  new_post = Post(
    title = data.get('title'),
    body = data.get('body'),
    user_id = data.get('user_id')
  )

  db.session.add(new_post)
  db.session.commit()

  return jsonify(new_post.to_dict())

# edit a post
@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def edit_post_by_id(post_id):
  post = Post.query.get(post_id)

  if not post:
    return jsonify({"message": "Post not found."}), 404

  if post.user_id == current_user.id:
    user_changes = request.get_json()

    for [key, item] in user_changes.items():
      setattr(post, key, item)

    db.session.commit()

    return post.to_dict()

  else:
    return jsonify({'message': "forbidden"}), 403

# delete a post
@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post_by_id(post_id):
  post = Post.query.get(post_id)

  if not post:
    return jsonify({"message": f"Post not found."}), 404

  if post.user_id == current_user.id:
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted."}), 200

  else:
    return jsonify({'message': "forbidden"}), 403


# create post image
@post_routes.route('/<int:post_id>/images', methods=["POST"])
@login_required
def create_post_image(post_id):
  post = Post.query.get(post_id)

  if not post:
    return jsonify({"message": f"Post not found."}), 404

  if post.user_id == current_user.id:
    data = request.get_json()

    new_image = PostImage(
      image_url = data.get('image_url'),
      post_id = post_id,
      user_id = current_user.id
    )

    db.session.add(new_image)
    db.session.commit()

  return jsonify(new_image.to_dict())

# delete post image
@post_routes.route('/<int:post_id>/images/<int:image_id>', methods=['DELETE'])
@login_required
def delete_post_image(post_id, image_id):
  post = Post.query.get(post_id)
  image = PostImage.query.get(image_id)

  if not post:
    return jsonify({"message": f"Post not found."}), 404

  if not image:
    return jsonify({"message": f"Image not found."}), 404

  if post.user_id == current_user.id:
    db.session.delete(image)
    db.session.commit()
    return jsonify({"message": "Post Image deleted."}), 200

  return jsonify({'message': "forbidden"}), 403

# get post image
@post_routes.route('/images', methods=['GET'])
def get_post_image():
  postimages = PostImage.query.all()

  allPostImages = []

  for image in postimages:
    image_data = {
      'id' : image.id,
      'image_url' : image.image_url,
      'post_id': image.post_id,
      'user_id': image.user_id
    }
    allPostImages.append(image_data)

  return jsonify({"PostImages": allPostImages})
