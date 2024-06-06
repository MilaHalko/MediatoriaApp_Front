import React from 'react';
import {View} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const Picker = ({setValue, itemsArray, placeholder = 'Select', widthPx = 150, styles = ''}) => {
    const pickerStyle = {color: 'white', padding: 10, width: widthPx}
    return (
        <View className={`border-2 border-border rounded mr-5 bg-dry ${styles}`}>
            <RNPickerSelect
                onValueChange={value => setValue(value)}
                items={itemsArray.map(item => ({label: item.toString(), value: item}))}
                placeholder={{label: placeholder, value: null}}
                style={{inputIOS: pickerStyle, inputAndroid: pickerStyle}}
            />
        </View>
    );
};

export default Picker;
