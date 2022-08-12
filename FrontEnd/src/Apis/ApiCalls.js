const sendPostData = async (apiAddress, bodyData, token) => {
  try {
    const sendData = await fetch(apiAddress, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(bodyData),
    });

    const response = await sendData.json();
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = { sendPostData };
