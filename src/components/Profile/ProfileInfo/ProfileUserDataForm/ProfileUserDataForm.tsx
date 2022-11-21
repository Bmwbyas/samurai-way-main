import React from 'react';
import {useForm, SubmitHandler} from "react-hook-form";

import {UserProfileType} from "../../../../Redux/profile-reduser";
import {UseFormRegister} from "react-hook-form/dist/types/form";

type Inputs = {
    dataFromServer: {
        aboutMe: string
        lookingForAJob: boolean
        lookingForAJobDescription: string
        fullName: string
        contacts: {
            github: string
            vk: string
            facebook: string
            instagram: string
            twitter: string
            website: string
            youtube: string
            mainLink: string
        }
    }
    contactsCheckbox: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
};
type ProfileUserDataFormPropsType = {
    updateProfileData: (data: UserProfileType) => void
    setEditMode: (value: boolean) => void
    profile: UserProfileType | null
}


export const ProfileUserDataForm: React.FC<ProfileUserDataFormPropsType> = ({
                                                                                profile,
                                                                                setEditMode,
                                                                                updateProfileData
                                                                            }) => {

    const {register, handleSubmit, watch, reset, formState: {errors, isValid}} = useForm<Inputs>({mode: "onBlur"});
    const facebook = watch("contactsCheckbox.facebook")
    const instagram = watch("contactsCheckbox.instagram")
    const github = watch("contactsCheckbox.github")
    const vk = watch("contactsCheckbox.vk")
    const twitter = watch("contactsCheckbox.twitter")
    const mainLink = watch("contactsCheckbox.mainLink")
    const website = watch("contactsCheckbox.website")
    const youtube = watch("contactsCheckbox.youtube")

    const onSubmit: SubmitHandler<Inputs> = data => {
        setEditMode(false)
        updateProfileData(data.dataFromServer)
        reset()
        
    };
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <label>About me</label>
            <input placeholder={profile!.aboutMe} {...register("dataFromServer.aboutMe", {
                required: {value: true, message: 'This field is required'},
            })} />
            <label>FullName</label>
            <input {...register("dataFromServer.fullName", {
                required: {value: true, message: 'This field is required'},
                minLength: {value: 3, message: 'length>3'},
                maxLength: {value: 20, message: 'max length 20 symbol'}
            })} />
            {errors.dataFromServer?.fullName &&
                <span style={{color: 'red'}}>{errors.dataFromServer?.fullName.message}</span>}
            <label>LookingForAJob</label>
            <input type={"checkbox"} {...register("dataFromServer.lookingForAJob", {required: true})}/>
            {errors.dataFromServer?.lookingForAJob && <span style={{color: 'red'}}>This field is required</span>}
            <input {...register("dataFromServer.lookingForAJobDescription", {required: true,})} />
            {errors.dataFromServer?.lookingForAJobDescription &&
                <span style={{color: 'red'}}>This field is required</span>}
            <label>Contacts</label>

            <Contact register={register} valueFromWatch={facebook} placeholderCheckbox={"add facebook"}
                     placeholderInput={'Enter your facebook'} nameCheckbox={"contactsCheckbox.facebook"}
                     nameInput={"dataFromServer.contacts.facebook"}
            />
            <Contact register={register} valueFromWatch={instagram} placeholderCheckbox={"add instagram"}
                     placeholderInput={'Enter your instagram'} nameCheckbox={"contactsCheckbox.instagram"}
                     nameInput={"dataFromServer.contacts.instagram"}
            />
            <Contact register={register} valueFromWatch={github} placeholderCheckbox={"add github"}
                     placeholderInput={'Enter your github'} nameCheckbox={"contactsCheckbox.github"}
                     nameInput={"dataFromServer.contacts.github"}
            />
            <Contact register={register} valueFromWatch={vk} placeholderCheckbox={"add vk"}
                     placeholderInput={'Enter your vk'} nameCheckbox={"contactsCheckbox.vk"}
                     nameInput={"dataFromServer.contacts.vk"}
            />
            <Contact register={register} valueFromWatch={twitter} placeholderCheckbox={"add twitter"}
                     placeholderInput={'Enter your twitter'} nameCheckbox={"contactsCheckbox.twitter"}
                     nameInput={"dataFromServer.contacts.twitter"}
            />
            <Contact register={register} valueFromWatch={mainLink} placeholderCheckbox={"add mainLink"}
                     placeholderInput={'Enter your mainLink'} nameCheckbox={"contactsCheckbox.mainLink"}
                     nameInput={"dataFromServer.contacts.mainLink"}
            />
            <Contact register={register} valueFromWatch={website} placeholderCheckbox={"add website"}
                     placeholderInput={'Enter your website'} nameCheckbox={"contactsCheckbox.website"}
                     nameInput={"dataFromServer.contacts.website"}
            />
            <Contact register={register} valueFromWatch={youtube} placeholderCheckbox={"add youtube"}
                     placeholderInput={'Enter your youtube'} nameCheckbox={"contactsCheckbox.youtube"}
                     nameInput={"dataFromServer.contacts.youtube"}
            />

            <input type="submit" disabled={!isValid}/>
        </form>
    );
};
type ContactPropsType = {
    register: UseFormRegister<Inputs>
    nameCheckbox: any
    nameInput: any
    placeholderCheckbox?: string
    placeholderInput?: string
    valueFromWatch?: string
}
export const Contact: React.FC<ContactPropsType> = ({
                                                        register, placeholderCheckbox, nameCheckbox, nameInput,
                                                        placeholderInput, valueFromWatch
                                                    }) => {

    return (
        <> <input placeholder={placeholderCheckbox} type={"checkbox"} {...register(nameCheckbox)} />
            {valueFromWatch && <input placeholder={placeholderInput}  {...register(nameInput)} />}
        </>
    )
}