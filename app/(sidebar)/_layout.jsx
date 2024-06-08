import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Colors} from "../../constants/Colors";

const SidebarLayout = () => {
    return (
        <>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="upcoming"/>
                <Stack.Screen name="users"/>
            </Stack>
            <StatusBar backgroundColor={Colors.main} style="light"/>
        </>
    );
};

export default SidebarLayout;
