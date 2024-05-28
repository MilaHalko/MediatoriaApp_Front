import React from 'react';
import {Colors} from "../../constants/Colors";
import {REVIEW_TEXT_MAX_LENGTH} from "../../constants/config";
import {Text, TextInput, View} from "react-native";

const TextInputWithMax = ({text = '', setText, styles = '', isError = false, maxLength = 100}) => {
    return (
        <View className={`bg-dry p-3 rounded relative ${styles} ${isError ? 'border border-subMain' : 'border border-border'}`}>
            <TextInput
                className='text-white font-hammersmith'
                placeholder={`${isError? 'Write a review!' : 'Write a review...'}`}
                placeholderTextColor={isError ? Colors.subMain : Colors.border}
                value={text}
                onChangeText={(text) => setText(text)}
                multiline
                maxLength={REVIEW_TEXT_MAX_LENGTH}
                textAlignVertical="top"
                style={{minHeight: 100}}
            />
            <Text className={`font-hammersmith text-right mt-1 
                ${text.length >= REVIEW_TEXT_MAX_LENGTH || isError ? 'text-subMain' : 'text-border'}`}>
                {text.length} / {REVIEW_TEXT_MAX_LENGTH}
            </Text>
        </View>
    );
};

export default TextInputWithMax;
