function getCookie(cookieName) {
  // Split the document.cookie string into an array of individual cookie key-value pairs
  const cookies = document.cookie.split(';');

  // Iterate through the cookies and find the one with the specified name
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // Trim any leading or trailing whitespace

    // Check if the cookie starts with the specified name
    if (cookie.startsWith(`${cookieName}=`)) {
      // Extract and return the cookie value
      return cookie.substring(cookieName.length + 1);
    }
  }

  // If the cookie is not found, return null or an appropriate default value
  return null;
}

export default getCookie
