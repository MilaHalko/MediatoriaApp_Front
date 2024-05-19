import React, {useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, Image, ScrollView, Text, View} from "react-native";
import {useAuth} from "../../context/AuthProvider";
import logos from "../../constants/logos";
import FormField from "../../components/fields/FormField";
import RedButton from "../../components/buttons/RedButton";
import {DataLine} from "../../components/fields/DataLine";

const Account = () => {
    const {user, updateUser} = useAuth()
    // TODO: Implement edit mode
    const [editMode, setEditMode] = React.useState(false)
    const [form, setForm] = React.useState({
        username: user?.username,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const buttonStyle = 'min-w px-2'

    const onTextChange = ({field, e}) => {
        setForm({
            ...form,
            [field]: e.nativeEvent.text
        })
    }

    const handleDeleteAccount = () => {
        // TODO: Implement delete account
        // TODO: Implement Alert "Are you sure you want to delete your account?"
        console.log('Delete account')
    }

    const handleSave = async () => {
        console.log('Save account')
        const preparedForm = Object.fromEntries(Object.entries(form).filter(([_, v]) => v !== '' && v !== null))
        preparedForm.email = user?.email
        const updatedUser = await updateUser(preparedForm)
        setEditMode(false)
    }

    const handleEdit = () => {
        setEditMode(true)
    }

    return (
        <SafeAreaView className={"bg-main flex-1"}>
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className="w-full h-full justify-center"
                      style={{minHeight: Dimensions.get("window").height - 300}}
                >
                    <View className='flex-1 items-center max-h-[100px] justify-center'>
                        <Image source={logos.mediatoriaRed} className="w-3/4 h-10" resizeMode="contain"/>
                    </View>
                    <View className='w-auto m-2 p-8 bg-dry rounded-lg border border-border'>
                        {
                            editMode ? (<>
                                <Text className='text-xl font-bold text-white mb-2'>Change Name</Text>
                                <FormField label='Name' value={form.username}
                                           onTextChange={(e) => onTextChange({field: 'username', e})}
                                />

                                <Text className='text-xl font-bold mt-8 text-white mb-2'>Change Password</Text>
                                <FormField label='Old Password' value={form.oldPassword} placeholder='**********'
                                    onTextChange={(e) => onTextChange({field: 'oldPassword', e})}
                                    KeyboardType={'password'}
                                />
                                <FormField label='New Password' value={form.newPassword} placeholder='**********'
                                    onTextChange={(e) => onTextChange({field: 'newPassword', e})}
                                    KeyboardType={'password'}
                                />
                                <FormField label='Confirm Password' value={form.confirmPassword} placeholder='**********'
                                    onTextChange={(e) => onTextChange({field: 'confirmPassword', e})}
                                    KeyboardType={'password'}
                                />
                            </>) : (<>
                                <DataLine label='Username' value={user?.username}/>
                                <DataLine label='Email' value={user?.email}/>
                                <DataLine label='Registration Date'
                                          value={new Date(user?.createdAt).toLocaleDateString()}/>
                                <DataLine label='Favorite Movies' value={user?.favoriteMovies?.length}/>
                            </>)
                        }

                        <View className="flex flex-row justify-between mt-10">
                            <RedButton title={'Delete Account'} onPress={handleDeleteAccount}
                                       viewClassName={buttonStyle}/>
                            {
                                editMode
                                    ? (<RedButton title={'Save'} onPress={handleSave} viewClassName={`${buttonStyle} bg-dry`}/>)
                                    : (<RedButton title={'Edit Profile'} onPress={handleEdit} viewClassName={`${buttonStyle} bg-dry`}/>)
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Account;
