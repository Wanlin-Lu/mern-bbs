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
      return { error: { message: `Request failed. Error Code is ${response.status}, Error Text is ${response.statusText}` } }
    }

    return responseData
  } catch (err) {
    return { error: err.message || "Request failed." };
  }
}

