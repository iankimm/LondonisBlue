import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import OpenModalButton from "../OpenModalButton"
import DeleteFollowModal from "./DeleteFollowModal"
import "./Follow.css";
import { fetchUsers } from "../../store/user";
import { fetchFollows } from "../../store/following";

const PrintFollowUser = ({follow}) => {
  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state?.session?.user)
  const userFollowing = useSelector((state) => Object.values(state?.user)).find(user => user.id === follow.following_user_id)

  let {lastName, username, firstName} = {};

  if(userFollowing) {
    ({ lastName, username, firstName } = userFollowing);
  }

  // const sessionUser = useSelector((state) => state?.session?.user)

  // const follows = useSelector((state) => Object.values(state?.follow))

  // let follow = 0;

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchFollows())
  }, [dispatch])

  return (
    <div className="PrintFollowUser">
      <div className="FollowUser">
        username : {username}
      </div>
      <div className="FollowName">
        {firstName}, {lastName}
      </div>
      { follow &&
        <OpenModalButton
          className="DeletFollowButton"
          buttonText="Unfollow"
          modalComponent={<DeleteFollowModal followId={follow.id} followingUserId={follow.following_user_id}/>}
        />
      }
    </div>
  )
}

export default PrintFollowUser
