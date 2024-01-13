import * as Yup from 'yup'



export const signUpvalidation = Yup.object().shape({

  name: Yup.string().required(' name Required'),
  email: Yup.string()
    .email()
    .max(160)
    .required('Email is Required')
    .lowercase(),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum')
    .max(64, 'Password is too long - should be 64 chars maximun')
    .required('Password required')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  cpassword: Yup.string()
    .min(6, 'Password is too short - should be 6 chars minimum')
    .max(64, 'Password is too long - should be 64 chars maximun')
    .required('Password Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})


export const LoginForm = Yup.object().shape({
    email: Yup.string().required('Email is Required').email().lowercase(),
    password: Yup.string().required('Password is Required'),
  })


export const foodAddValidation=Yup.object().shape({

  name:Yup.string().required('name required'),
  food_category:Yup.string().required('category required'),
  price:Yup.number().typeError("Only number allowed").required('price required')
})



