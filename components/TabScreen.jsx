import {Tabs} from "expo-router";
import FooterTab from "./FooterTab";
import React from "react";

const TabScreen = ({name, title, iconComponent, iconSize}) => (
    <Tabs.Screen
        name={name}
        options={{
            title: title,
            headerShown: false,
            tabBarIcon: ({focused}) =>
                <FooterTab
                    label={title}
                    focused={focused}
                    icon={iconComponent}
                />
        }}
    ></Tabs.Screen>
);

export default TabScreen;