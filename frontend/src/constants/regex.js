/* eslint-disable no-useless-escape */
export const regex = {
  name: /^[A-Za-zÁÉÍÓÚČĎĚŇŘŠŤŽŮáéíóúýčďěňřšťžů\s]{1,50}$/,
  nameWithNumbers: /^[A-Za-zÁÉÍÓÚČĎĚŇŘŠŤŽŮáéíóúýčďěňřšťžů\d\s]{1,50}$/,
  description: /^.{1,50}$/,
  email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  phoneNumber: /^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  ico: /^\d{8}$/,
  zipCode: /^\d{3}\d{2}?$/,
  latitude: /^[-+]?([1-8]?\d(\,\d+)?|90(\,0+)?)$/,
  longitude: /^[-+]?(180(\,0+)?|((1[0-7]\d)|([1-9]?\d))(\,\d+)?)$/,
  // 8 characters,
  // 1 capital letter,
  // 1 small letter,
  // 1 number
  // it may contain special characters
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
};
