import React from 'react';
import Title from "../Title";
import {TouchableOpacity} from "react-native";

const SidebarButton = ({title, onPress, icon}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            className={'bg-dry border-border border-2 p-2 rounded w-full flex-row items-center justify-center'}>
            <Title title={title} icon={icon}/>
        </TouchableOpacity>
    );
};

export default SidebarButton;
