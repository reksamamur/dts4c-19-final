const handleErrorAuth = (errorcode) => {
  if (errorcode === "auth/wrong-password") {
    return alert("Invalid Password");
  }

  if (errorcode === "auth/too-many-requests") {
    return alert("Opps too many attempt, temporary disable this account");
  }

  if (errorcode === "auth/user-not-found") {
    return alert("User not found");
  }

  if (errorcode === "(auth/weak-password)") {
    return alert("Password should be at least 6 characters");
  }
};

export {
    handleErrorAuth
}