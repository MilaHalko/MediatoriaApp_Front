import React from 'react';
import {Tabs} from "expo-router";
import FooterTab from "../../components/FooterTab";
import {Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {Colors} from "../../constants/Colors";
import AuthorisedRoute from "../../components/wrappers/AuthorisedRoute";

const TabsLayout = () => {
        const iconSize = 25;
        return (
            <>
                <AuthorisedRoute>
                    <Tabs
                        screenOptions={{
                            tabBarShowLabel: false,
                            tabBarActiveBackgroundColor: Colors.white,
                            tabBarStyle: {
                                backgroundColor: Colors.dry,
                                height: 88,
                                paddingHorizontal: 10,
                            }
                        }}
                    >
                        <Tabs.Screen
                            name="home"
                            options={{
                                title: 'Home',
                                headerShown: false,
                                tabBarIcon: ({focused}) =>
                                    <FooterTab
                                        label="Main"
                                        focused={focused}
                                        icon={<MaterialIcons name='video-collection' size={iconSize}/>}
                                    />
                            }}
                        ></Tabs.Screen>

                        <Tabs.Screen
                            name="favourites"
                            options={{
                                title: 'Saved',
                                headerShown: false,
                                tabBarIcon: ({focused}) =>
                                    <FooterTab
                                        label="Saved"
                                        focused={focused}
                                        icon={<Feather name={'heart'} size={iconSize}/>}
                                    />
                            }}
                        ></Tabs.Screen>

                        <Tabs.Screen
                            name="account"
                            options={{
                                title: 'Account',
                                headerShown: false,
                                tabBarIcon: ({focused}) =>
                                    <FooterTab
                                        label="Account"
                                        focused={focused}
                                        icon={<MaterialCommunityIcons name={'account-outline'} size={iconSize}/>}
                                    />
                            }}
                        ></Tabs.Screen>

                        <Tabs.Screen
                            name="sidebar"
                            options={{
                                title: 'Options',
                                headerShown: false,
                                tabBarIcon: ({focused}) =>
                                    <FooterTab
                                        label="Options"
                                        focused={focused}
                                        icon={<FontAwesome5 name={'list-alt'} size={iconSize}/>}
                                    />
                            }}
                        ></Tabs.Screen>
                    </Tabs>
                </AuthorisedRoute>
            </>
        );
    }
;

export default TabsLayout;
