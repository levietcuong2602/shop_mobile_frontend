import request from "./../utils/request";

export async function signUp(user) {
  return await request({
    url: "api/v1/users",
    method: "POST",
    data: user,
  });
}

export async function signIn(account) {
  return await request({
    url: "api/v1/users/login",
    method: "POST",
    data: account,
  });
}
