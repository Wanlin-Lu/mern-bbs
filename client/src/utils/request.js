export const call = async (url, method = "GET", body = null, headers = { } ) => {
  try {
    const response = await fetch(url, {
      method,
      body,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })

    const responseData = await response.json()

    if (!response.ok) {
      return { error: { message: "Request failed due to server error." } }
    }

    return responseData
  } catch (err) {
    return { error: { message: "Request failed." } };
  }
}

