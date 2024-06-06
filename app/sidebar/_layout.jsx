import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";

const SidebarLayout = () => {
    return (
        <>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="upcoming"/>
            </Stack>
            <StatusBar backgroundColor={Colors.main} style="light"/>
        </>
    );
};

export default MovieLayout;
