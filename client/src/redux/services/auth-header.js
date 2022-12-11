export function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    console.log('found in storage...');
    console.log(user);
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
