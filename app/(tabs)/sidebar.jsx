import React from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "../../context/AuthProvider";
import {Colors} from "../../constants/Colors";
import {MaterialIcons} from "@expo/vector-icons";
import SidebarButton from "../../components/buttons/SidebarButton";

const SideBar = () => {
    const {logout} = useAuth();

    const logoutIcon = () => <MaterialIcons name="logout" size={24} color={Colors.star}/>
    return (
        <SafeAreaView className={'flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="flex-1 min-h-[85vh] items-center justify-center m-3">
                    <SidebarButton title={'Logout'} icon={logoutIcon} onPress={logout}/>
                    {/*    upcoming filed like line*/}
                    {/*    for admin: redirect to page with users data table*/}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SideBar;
