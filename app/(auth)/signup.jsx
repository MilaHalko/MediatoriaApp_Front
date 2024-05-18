import React, {useState} from 'react';
import {Alert, Dimensions, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import RedButton from "../../components/buttons/RedButton";
import FormField from "../../components/fields/FormField";
import {Link, router} from "expo-router";
import {fetchSignup} from "../../store/slices/authSlice";
import {useAuth} from "../../context/AuthProvider";

function Signup() {
    const {signup} = useAuth()

    const [form, setForm] = useState({
        username: "Mila Halko",
        email: "milagalko@gmail.com",
        password: "111111",
        confirmPassword: "111111",
    });

    const handleSubmit = async () => {
        const user = await signup(form)
        Alert.alert('Signup Success', `Welcome, ${user.username}!`)
        router.replace('/(tabs)/home')
    }

    const onTextChange = ({field, e},) => {
        setForm({
            ...form,
            [field]: e.nativeEvent.text
        })
    }

    return (
        <SafeAreaView className="bg-main h-full">
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className="w-full h-full justify-center"
                    style={{
                        minHeight: Dimensions.get("window").height - 300,
                    }}
                >
                    {/*<View className='flex-1 items-center justify-center mb-5'>*/}
                    {/*    <Image source={logos.mediatoriaRed} className="w-3/4 h-10" resizeMode="contain"/>*/}
                    {/*</View>*/}
                    <View className='w-auto m-2 p-8 bg-dry rounded-lg border border-border'>
                        <FormField
                            label='Full Name'
                            value={form.username}
                            placeholder={'Mediatoria User'}
                            onTextChange={(e) => onTextChange({field: 'name', e})}
                            KeyboardType={'default'}
                        />

                        <FormField
                            label='Email'
                            value={form.email}
                            placeholder={'mediatoria@gmail.com'}
                            onTextChange={(e) => onTextChange({field: 'email', e})}
                            KeyboardType={'email-address'}
                        />
                        <FormField
                            label='Password'
                            value={form.password}
                            placeholder='**********'
                            onTextChange={(e) => onTextChange({field: 'password', e})}
                            KeyboardType={'password'}
                        />

                        <FormField
                            label='Confirm Password'
                            value={form.confirmPassword}
                            placeholder='**********'
                            onTextChange={(e) => onTextChange({field: 'confirmPassword', e})}
                            KeyboardType={'password'}
                        />

                        <RedButton title={'Sign Up'} onPress={handleSubmit} viewClassName={'my-5'}/>

                        <Text className='text-center text-border text-lg'>
                            Already have an account? {" "}
                            <Link href={'/login'} className='text-dryGray ml-2'>
                                Log In
                            </Link>
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Signup;