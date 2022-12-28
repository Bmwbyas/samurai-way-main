import * as yup from "yup";


export const schema = yup.object({
    email: yup.string().required('This field is required').email('invalid email'),
    password: yup.string().required('This field is required').min(4,'must be at least 8 characters long' ),
    rememberMe: yup.boolean(),
    captcha: yup.string(),
}).required()
