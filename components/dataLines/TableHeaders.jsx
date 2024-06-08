import React from 'react';
import {ScrollView, Text, View} from "react-native";

const TableHeaders = ({tableParams, styles, textStyles}) => {
    return (
        <View className={`flex-row py-2 bg-dry`}>
            {
                tableParams.map(({title, width}) => (
                    <ScrollView horizontal={true} style={{width: width, height: 35, paddingLeft: 8}} key={title}>
                        <View className="flex-1 justify-center">
                            <Text className="text-white text-center">
                                {title}
                            </Text>
                        </View>
                    </ScrollView>
                ))
            }
        </View>
    );
};

export default TableHeaders;
