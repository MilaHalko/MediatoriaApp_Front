import React from 'react';
import {ScrollView, Text, View} from "react-native";

const TableCell = ({user, tableParam}) => {
    return (
        <ScrollView horizontal={true} style={{width: tableParam?.width || 100, height: 35, paddingLeft: 8}}>
            <View className="flex-1 justify-center">
                {tableParam.cellData ? (
                    <Text className="text-white text-center">
                        {user[tableParam.cellData]}
                    </Text>
                ) : (
                    <>
                    {
                        user.role !== 'admin' && tableParam.cellComponent(user._id)
                    }
                    </>
                )}
            </View>
        </ScrollView>
    );
};

export default TableCell;
