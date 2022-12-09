import * as yup from "yup";


const errorMessege='input the URL in the format --> https://vk.com or https://www.vk.com'
export const schemaProfile = yup.object({
    dataFromServer: yup.object({
        aboutMe: yup.string().required('This field is required'),
        lookingForAJob: yup.boolean(),
        lookingForAJobDescription: yup.string().required('This field is required'),
        fullName: yup.string().required('This field is required').min(3, 'min lenght 3 symbols').max(20, 'max lenght 20 symbols'),
        contacts: yup.object({
            github: yup.string().url(errorMessege),
            vk: yup.string().url(errorMessege),
            facebook: yup.string().url(errorMessege),
            instagram: yup.string().url(errorMessege),
            twitter: yup.string().url(errorMessege),
            website: yup.string().url(errorMessege),
            youtube: yup.string().url(errorMessege),
            mainLink: yup.string().url(errorMessege),
        })
    })
})
