import { emailValidation, Min5 } from './validationObjects';

export const fields = [
  {
    id: 'firstName',
    label: 'First Name',
    autoComplete: 'given-name',
    validation: Min5,
    myType: 'text' as const,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    autoComplete: 'family-name',
    validation: Min5,
    myType: 'text' as const,
  },
  {
    id: 'email',
    label: 'Email',
    autoComplete: 'email',
    validation: emailValidation,
    myType: 'email' as const,
  },
  // {
  //   id: 'phone',
  //   label: 'Phone',
  //   validation: PhoneValidation,
  //   myType: 'text' as const,
  // },
];
