import { useState, useEffect } from "react";
import ChatAPI from "./ChatAPI.js";

function useFriendStatus(friendID) {
  console.log("friendID: ", friendID);
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      console.log("statusinside status: ", status);
      setIsOnline(status);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

export default useFriendStatus;
