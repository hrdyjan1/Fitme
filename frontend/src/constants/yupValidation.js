import * as yup from 'yup';
import { regex } from 'src/constants/regex'
import { validText } from 'src/constants/validTexts'

export const yupValidation = {
  required: yup.string()
    .required(validText.required),

  name: yup.string()
    .matches(regex.name, validText.name)
    .required(validText.required),

  nickname: yup.string()
    .matches(regex.name, validText.nickname)
    .required(validText.required),

  firstName: yup.string()
    .matches(regex.name, validText.firstName)
    .required(validText.required),

  lastName: yup.string()
    .matches(regex.name, validText.lastName)
    .required(validText.required),

  organization: yup.string()
    .matches(regex.nameWithNumbers, validText.organization)
    .required(validText.required),

  ico: yup.string()
    .matches(regex.ico, validText.ico)
    .required(validText.required),

  email: yup.string()
    .email(validText.email)
    .required(validText.required),

  phoneNumber: yup.string()
    .matches(regex.phoneNumber, validText.phoneNumber)
    .required(validText.required),

  street: yup.string()
    .matches(regex.nameWithNumbers, validText.street)
    .required(validText.required),

  city: yup.string()
    .matches(regex.name, validText.city)
    .required(validText.required),

  zipCode: yup.string()
    .matches(regex.zipCode, validText.zipCode)
    .required(validText.required),

  country: yup.string()
    .matches(regex.name, validText.country)
    .required(validText.required),

  password: yup.string()
    .matches(regex.password, validText.password)
    .required(validText.required),

  passwordCheck: (fieldToCompare) => (
    yup.string()
    .oneOf([yup.ref(fieldToCompare), null], validText.passwordCheck)
    .required(validText.required)
  )
}
