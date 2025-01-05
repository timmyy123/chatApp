export const getOtherUser = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};
