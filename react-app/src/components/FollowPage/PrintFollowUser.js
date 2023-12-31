import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import OpenModalButton from "../OpenModalButton"
import DeleteFollowModal from "./DeleteFollowModal"

const PrintFollowUser = ({follow}) => {
  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state?.session?.user)
  const userFollowing = useSelector((state) => Object.values(state?.user)).find(user => user.id === follow.following_user_id)

  const {lastName, username, firstName} = userFollowing

  // const sessionUser = useSelector((state) => state?.session?.user)

  // const follows = useSelector((state) => Object.values(state?.follow))

  // let follow = 0;

  useEffect(() => {
  }, [dispatch])

  return (
    <div className="PrintFollowUser">
      <div>
        username : {username}
      </div>
      <div>
        {firstName}, {lastName}
      </div>
      { follow &&
        <OpenModalButton
          className="DeletFollowButton"
          buttonText="Delete Follow"
          modalComponent={<DeleteFollowModal followId={follow.id} followingUserId={follow.following_user_id}/>}
        />
      }
    </div>
  )
}

export default PrintFollowUser
