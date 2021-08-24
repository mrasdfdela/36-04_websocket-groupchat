// const axios = require("axios");

function dadJoke() {
  // url = "https://icanhazdadjoke.com/slack";
  // result = await axios.get(url)
  //   .then(res => console.log(res.data))
  //   .catch(err => console.error(err));
  // return result.attachments[0].text;
  joke = "I put the cat out. // I didn't realize it was on fire!"
  return { "name":"private", "type":"chat", text: joke}
}

module.exports = { dadJoke };