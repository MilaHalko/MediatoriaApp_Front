import React, {useEffect} from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "../../context/AuthProvider";
import {Colors} from "../../constants/Colors";
import {Feather, MaterialIcons} from "@expo/vector-icons";
import SidebarButton from "../../components/buttons/SidebarButton";
import {router} from "expo-router";

const SideBar = () => {
    const {logout, isAdmin, user} = useAuth();
    const spaceBetweenButton = 'mb-3';
    const [hasPermission, setHasPermission] = React.useState(false);

    useEffect(() => {
        isAdmin().then((result) => setHasPermission(result));
    }, [user]);

    const logoutIcon = () => <MaterialIcons name="logout" size={24} color={Colors.star}/>
    const upcomingIcon = () => <Feather name="sun" size={24} color={Colors.star}/>
    const usersIcon = () => <Feather name="users" size={24} color={Colors.star}/>

    return (
        <SafeAreaView className={'flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="flex-1 min-h-[85vh] items-center justify-center m-3">
                    <SidebarButton title={'Logout'} icon={logoutIcon}
                                   onPress={logout} styles={spaceBetweenButton}/>
                    <SidebarButton title={'Upcoming'} icon={upcomingIcon}
                                   onPress={() => router.push('/(sidebar)/upcoming')}/>
                    {
                        hasPermission &&
                        <>
                            <View className={spaceBetweenButton}/>
                            <SidebarButton title={'Users'} icon={usersIcon}
                                           onPress={() => router.push('/(sidebar)/users')}/>
                        </>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SideBar;
