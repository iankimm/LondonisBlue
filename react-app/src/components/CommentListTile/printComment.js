const PrintComment = ({comment, like}) => {

  let count = 0

  return (
    <div className="PrintCommentContainer">
      {comment.body}
      {comment.created_at}

      {/* commentlikes */}
      {
        like && like.forEach((lk) => {
          if(lk.comment_id == comment.id) count ++
        })
      }
      <div>
      <i class="fa-regular fa-heart"></i> {count}
      </div>


    </div>
  )
}

export default PrintComment
