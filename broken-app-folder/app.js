const express = require('express');
const axios = require('axios');
const ExpressError = require("./expressError");
const app = express();

app.use(express.json());

async function getDevs(arr) {
  let promises = arr.map(async dev => {
    try {
      // Try to get user info
      return await axios.get(`https://api.github.com/users/${dev}`)
    } catch(err) {
      // Return error status code if user not found
      return err.response.status
    }
  })
  // Fulfill all promises before returning array
  let resp = Promise.all(promises)
  return resp 
}

app.post('/', async (req, res, next) => {
  try {
    // Get user info from API
    let resp = await getDevs(req.body.developers)
    // Check for 404 in response array and throw error if present
    if (resp.find(res => res === 404)) throw new ExpressError(`User "${req.body.developers[resp.indexOf(404)]}" not found`, 400);
    // Create object of desired information for response
    let out = resp.map(r => ({ name: r.data.name, bio: r.data.bio }))
    // Return desired response as JSON
    return res.json(out);

  } catch(err) {
    // Display error response if request is unsuccessful
    return next(err);
  }
});

app.listen(3000);