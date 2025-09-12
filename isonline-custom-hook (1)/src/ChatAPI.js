import React from "react";

function subscribeToFriendStatus(id, callback) {
  console.log("id, callback: ", id, id < 5, callback);
  if (id < 5) callback(true);
  else callback(false);
}
function unsubscribeFromFriendStatus() {}

export default {
  subscribeToFriendStatus,
  unsubscribeFromFriendStatus,
};
