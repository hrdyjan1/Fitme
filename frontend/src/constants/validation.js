import * as Yup from 'yup';

const validation = {
  name: Yup.string()
    .min(2, 'Přílíš krátké jméno.')
    .max(50, 'Maximální délka jména je 50 znaků.')
    .required('Toto pole je povinné.'),
}

export { validation }
