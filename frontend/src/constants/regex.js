/* eslint-disable no-useless-escape */
const regex = {
  name: /^[A-ZĚŠČŘŽÝÁÍÉ][a-zěščřžýáíé]{0,50}$/i,
  email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  phoneNumber: /^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  street: /^[A-ZĚŠČŘŽÝÁÍÉ\d\s][a-zěščřžýáíé\d\s]{0,50}$/,
  zipCode: /^\d{3}\s?\d{2}?$/,
  // 8 characters,
  // 1 capital letter,
  // 1 small letter,
  // 1 number
  // it may contain special characters
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
}

export { regex };
