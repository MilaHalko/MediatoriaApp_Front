import React, {useState} from 'react';
import {Alert, Dimensions, Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import RedButton from "../../components/buttons/RedButton";
import FormField from "../../components/fields/FormField";
import {Link} from "expo-router";
import logos from "../../constants/logos";
import {useDispatch} from "react-redux";
import {fetchAuth} from "../../store/slices/authSlice";

function Login() {
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await dispatch(fetchAuth(form)).unwrap()
            Alert.alert('Login Success', `Welcome back, ${result.role} ${result.username}!`)
            // navigate('/')
        } catch (error) {
            console.log(error)
            Alert.alert('Login Failed', error.message)
        }
    }

    const onTextChange = ({field, e}) => {
        setForm({
            ...form,
            [field]: e.nativeEvent.text
        })
    }

    return (
        <SafeAreaView className={"bg-main flex-1"}>
            <ScrollView contentContainerStyle={{height: '100%'}}>
                {/*<View className='flex-1 items-center justify-center border-blue-100 border-2'>*/}
                {/*    <Image source={logos.mediatoriaRed} className="w-3/4 h-10" resizeMode="contain"/>*/}
                {/*</View>*/}
                <View className="w-full h-full justify-center"
                    style={{
                        minHeight: Dimensions.get("window").height - 300,
                    }}
                >
                    <View className='w-auto m-2 p-8 bg-dry rounded-lg border border-border'>
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

                        <RedButton title={'Log In'} onPress={handleSubmit} viewClassName={'my-5'}/>

                        <Text className='text-center text-border text-lg'>
                            Don't have an account? {" "}
                            <Link href={'/signup'} className='text-dryGray ml-2'>
                                Sign Up
                            </Link>
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Login;