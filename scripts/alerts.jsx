import {Alert} from "react-native";

export const confirmAlert = ({title, onConfirm, isDestructive = false}) => {
    Alert.alert(
        title,
        "Are you sure?",
        [
            {
                text: "Cancel",
                style: "cancel",
                onPress: () => console.log("Cancel Pressed"),
            },
            {
                text: "Yes",
                onPress: onConfirm,
                style: isDestructive ? "destructive" : "default",
            },
        ],
        { cancelable: true }
    );
}