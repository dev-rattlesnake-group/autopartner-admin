export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const isLoggedIn = !!user?.access_token
  // const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL)
  if (isLoggedIn) {
    return { Authorization: `Bearer ${user.access_token}` }
  } else {
    return {}
  }
}
