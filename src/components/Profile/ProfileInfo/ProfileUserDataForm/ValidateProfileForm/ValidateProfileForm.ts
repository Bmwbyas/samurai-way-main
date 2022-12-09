import * as yup from "yup";

const errorMessege='input the URL in the format --> https://vk.com or https://www.vk.com'
export const schemaProfile = yup.object({
    dataFromServer: yup.object({
        aboutMe: yup.string().required('This field is required'),
        lookingForAJob: yup.boolean(),
        lookingForAJobDescription: yup.string().required('This field is required'),
        fullName: yup.string().required('This field is required').min(3, 'min lenght 3 symbols').max(20, 'max lenght 20 symbols'),
        contacts: yup.object({
            github: yup.string().matches(/(.com)/,{message:errorMessege,  excludeEmptyString: true }),
            vk: yup.string().matches(/(.com)/,{message:errorMessege,  excludeEmptyString: true }),
            facebook: yup.string().matches(/(.com)/,{message:errorMessege,  excludeEmptyString: true }),
            instagram: yup.string().matches(/(.com)/,{message:errorMessege,  excludeEmptyString: true }),
            twitter: yup.string().matches(/(.com)/,{message:errorMessege,  excludeEmptyString: true }),
            website: yup.string().matches(/(.com)/,{message:errorMessege,  excludeEmptyString: true }),
            youtube: yup.string().matches(/(.com)/,{message:errorMessege,  excludeEmptyString: true }),
            mainLink: yup.string().matches(/(.com)/,{message:errorMessege,  excludeEmptyString: true }),
        })
    })
})
