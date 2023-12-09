from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError

def starting_with_spaces(form, field):
    if (field.data).startswith(' '):
        raise ValidationError('Input cannot begin with a space.')

class CommentForm(FlaskForm):
  body = TextAreaField('body', validators=[DataRequired(), starting_with_spaces])
