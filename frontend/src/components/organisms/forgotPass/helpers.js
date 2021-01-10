import { gql } from '@apollo/client';
import { regex } from 'src/constants/regex';

const initialFormValues = { email: '' };

const validate = (values) => {
  const errors = {};
  if (!regex.email.test(values.email)) {
    errors.email = 'Zadejte e-mail ve správném formátu';
  }
  return errors;
};

const FORGOT_PASS = gql`
  mutation ForgotPass($email: String!) {
    sendEmailForgotPass(email: $email)
  }
`;

const handleValidEmail = () => 'Zkontrolujte si email';
const handleInvalidEmail = (error) => error?.message || 'Chyba pri zmene hesla';

export {
  initialFormValues,
  validate,
  FORGOT_PASS,
  handleInvalidEmail,
  handleValidEmail,
};
