import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";

const FormField = ({label, value, placeholder, className, onTextChange, KeyboardType, icon, ...props}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    icon = KeyboardType === 'password'
        ? (<Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="white"/>)
        : icon

    return (
        <View className={`w-full mb-5 ${className}`}>
            {label &&
                <Text className="text-border font-semibold text-base">{label}</Text>
            }
            <View className="w-full flex-row items-center justify-between">
                <TextInput
                    placeholder={placeholder}
                    onChange={onTextChange}
                    value={value}
                    className={`w-full mt-1 p-3 text-base border-2 border-border rounded text-white`}
                    placeholderTextColor={Colors.text}
                    secureTextEntry={KeyboardType === 'password' && !showPassword}
                    keyboardType={KeyboardType}
                    multiline={false}
                    {...props}
                />

                {icon && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <View className="absolute right-0 top-[-22px] w-12 h-12 items-center justify-center">
                            {icon}
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
