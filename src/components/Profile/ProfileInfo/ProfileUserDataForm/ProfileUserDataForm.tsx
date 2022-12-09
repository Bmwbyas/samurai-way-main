import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";

import {ContactsType, UserProfileType, UserUpdateProfileType} from "../../../../Redux/profile-reduser";
import {Button, Input, Radio, Row} from "antd";
import sLogin from "../../../Login/Login.module.css";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {schemaProfile} from "./ValidateProfileForm/ValidateProfileForm";
import TextArea from "antd/es/input/TextArea";
import style from "../ProfileUserData/ProfileUserData.module.css";
import s from "./ProfileUserDataForm.module.css"
import {ContactForm} from "./ContactForm/ContactForm";


export type Inputs = {
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
    updateProfileData: (data: UserUpdateProfileType) => void
    setEditMode: (value: boolean) => void
    profile: UserProfileType
}


export const ProfileUserDataForm: React.FC<ProfileUserDataFormPropsType> = ({
                                                                                profile,
                                                                                setEditMode,
                                                                                updateProfileData
                                                                            }) => {

    const navigateToProfile = () => {
        setEditMode(false)

    }
    const {
        control, handleSubmit, watch,
        reset, formState: {errors, isValid}
    } = useForm<Inputs>(
        {
            mode: "onBlur",
            resolver: yupResolver(schemaProfile)
        }
    );
    const watchValue = {
        facebook: watch("contactsCheckbox.facebook"),
        instagram: watch("contactsCheckbox.instagram"),
        github: watch("contactsCheckbox.github"),
        vk: watch("contactsCheckbox.vk"),
        twitter: watch("contactsCheckbox.twitter"),
        mainLink: watch("contactsCheckbox.mainLink"),
        website: watch("contactsCheckbox.website"),
        youtube: watch("contactsCheckbox.youtube")
    }
    React.useEffect(() => {
        const subscription = watch((value, {name, type}) => console.log(value, name, type));
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit: SubmitHandler<Inputs> = data => {
        setEditMode(false)
        console.log(data)
        updateProfileData(data.dataFromServer)
        reset()

    };

    console.log(errors)
    return (

        <form className={style.personalInfoContainer} onSubmit={handleSubmit(onSubmit)}>


            <Row>
                <label className={s.label}>FullName</label>
                <Controller
                    name="dataFromServer.fullName"
                    control={control}
                    defaultValue={profile.fullName === null ? '' : profile.fullName}
                    render={({field}) => <Input  {...field} size="small" placeholder="input your name"/>}
                />
            </Row>

            <Row className={sLogin.errorMessage}>
                {errors.dataFromServer?.fullName && errors.dataFromServer?.fullName.message}
            </Row>

            <Row>
                <label className={s.label}>About me</label>
                <Controller
                    name="dataFromServer.aboutMe"
                    control={control}
                    defaultValue={profile.aboutMe === null ? '' : profile.aboutMe}
                    render={({field}) => <TextArea {...field} placeholder="tell a few words about yourself"
                                                   autoSize/>}
                />

            </Row>

            <div className={sLogin.errorMessage}>
                {errors.dataFromServer?.aboutMe && errors.dataFromServer?.aboutMe.message}
            </div>

            <Row>
                <label className={s.label}>You looking for a job?</label>
                <Controller
                    name="dataFromServer.lookingForAJob"
                    control={control}
                    defaultValue={profile.lookingForAJob}
                    render={({field: {onChange, value, ...restProps}}) =>
                        <Radio.Group {...restProps} onChange={onChange} value={value}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                        </Radio.Group>}
                />

            </Row>

            <div className={sLogin.errorMessage}>
                {errors.dataFromServer?.lookingForAJob && errors.dataFromServer?.lookingForAJob.message}
            </div>

            <Row>
                <label className={s.label}>Skills and work experience</label>
                <Controller
                    name="dataFromServer.lookingForAJobDescription"
                    defaultValue={profile.lookingForAJobDescription === null ? '' : profile.lookingForAJobDescription}
                    control={control}
                    render={({field}) => <TextArea {...field} placeholder="List your skills and work experience"
                                                   autoSize/>}
                />
            </Row>

            <div className={sLogin.errorMessage}>
                {errors.dataFromServer?.lookingForAJobDescription && errors.dataFromServer?.lookingForAJobDescription.message}
            </div>

            <label className={s.label}>Contacts</label>
            {(Object.keys(profile.contacts!) as (keyof ContactsType)[])
                .map((key) => {

                    return <ContactForm key={key} name={key} control={control}
                                    valueFromWatch={watchValue[key]}
                                    nameCheckbox={`contactsCheckbox.${[key]}`}
                                    nameInput={`dataFromServer.contacts.${[key]}`}
                                    errors={errors?.dataFromServer?.contacts?.[key]}
                    />
                })
            }

            <Row className={s.buttonContainer}>
                <Button className={s.submit}  type="primary" htmlType="submit" size={"small"}
                        disabled={!isValid}>
                    Submit
                </Button>
                <Button type="primary"  onClick={navigateToProfile} size={"small"}>
                    Cancel
                </Button>
            </Row>

        </form>
    );
};
