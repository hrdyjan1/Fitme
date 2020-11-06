const name = /^[A-ZĚŠČŘŽÝÁÍÉ][a-zěščřžýáíé]{0,50}$/i
const email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
// at least 8 characters, 1 capital letter, 1 small letter and 1 number, it may contain special characters
const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export {
  name,
  email,
  password
}
