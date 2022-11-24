import * as yup from "yup";


export const schemaProfile = yup.object({
    dataFromServer: yup.object({
        aboutMe: yup.string().required('This field is required'),
        lookingForAJob: yup.boolean(),
        lookingForAJobDescription: yup.string().required('This field is required'),
        fullName: yup.string().required('This field is required').min(3, 'min lenght 3 symbols').max(20, 'max lenght 20 symbols'),
        contacts: yup.object({
            github: yup.string().matches(/(.com)/,{message:'input the URL in the format --> example.com',  excludeEmptyString: true }),
            vk: yup.string().matches(/(.com)/,{message:'input the URL in the format --> example.com',  excludeEmptyString: true }),
            facebook: yup.string().matches(/(.com)/,{message:'input the URL in the format --> example.com',  excludeEmptyString: true }),
            instagram: yup.string().matches(/(.com)/,{message:'input the URL in the format --> example.com',  excludeEmptyString: true }),
            twitter: yup.string().matches(/(.com)/,{message:'input the URL in the format --> example.com',  excludeEmptyString: true }),
            website: yup.string().matches(/(.com)/,{message:'input the URL in the format --> example.com',  excludeEmptyString: true }),
            youtube: yup.string().matches(/(.com)/,{message:'input the URL in the format --> example.com',  excludeEmptyString: true }),
            mainLink: yup.string().matches(/(.com)/,{message:'input the URL in the format --> example.com',  excludeEmptyString: true }),
        })
    })
})
