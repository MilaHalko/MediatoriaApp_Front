import React from 'react';
import {Tabs} from "expo-router";
import FooterTab from "../../components/FooterTab";
import {Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {Colors} from "../../constants/Colors";
import AuthorisedRoute from "../../components/wrappers/AuthorisedRoute";
import {StatusBar} from "expo-status-bar";
import TabScreen from "../../components/TabScreen";

const TabsLayout = () => {
    const iconSize = 25;

    return (
        <AuthorisedRoute>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveBackgroundColor: Colors.white,
                    tabBarStyle: {
                        backgroundColor: Colors.dry,
                        height: 88,
                        paddingHorizontal: 10,
                        borderTopWidth: 0,
                    }
                }}
            >
                <TabScreen
                    name="home"
                    title="Main"
                    iconComponent={<MaterialIcons name='video-collection' size={iconSize} />}
                    iconSize={iconSize}
                />
                <TabScreen
                    name="favourites"
                    title="Saved"
                    iconComponent={<Feather name={'heart'} size={iconSize} />}
                    iconSize={iconSize}
                />
                <TabScreen
                    name="account"
                    title="Account"
                    iconComponent={<MaterialCommunityIcons name={'account-outline'} size={iconSize} />}
                    iconSize={iconSize}
                />
                <TabScreen
                    name="sidebar"
                    title="Options"
                    iconComponent={<FontAwesome5 name={'list-alt'} size={iconSize} />}
                    iconSize={iconSize}
                />
            </Tabs>
            <StatusBar backgroundColor={Colors.main} style="light" />
        </AuthorisedRoute>
    );
};

export default TabsLayout;
