import React, {useEffect} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, TouchableOpacity, View} from "react-native";
import Title from "../../components/Title";
import {useAuth} from "../../context/AuthProvider";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import TableHeaders from "../../components/dataLines/TableHeaders";
import TableCell from "../../components/dataLines/TableCell";
import LoadingIndicator from "../../components/LoadingIndicator";
import BackButton from "../../components/buttons/BackButton";
import {confirmAlert} from "../../scripts/alerts";

const Users = () => {
    const {user, loadUsers, deleteUserById} = useAuth();
    const [users, setUsers] = React.useState([]);
    const [localLoading, setLocalLoading] = React.useState(true);

    const deleteIconSize = 25;
    const deleteIcon = (userId) => (
        <TouchableOpacity className="items-center justify-center" onPress={() => handleDeleteUser(userId)}
        >
            <AntDesign name="delete" size={deleteIconSize} color={Colors.text}/>
        </TouchableOpacity>
    );

    const tableParams = [
        {title: 'Username', width: 80, cellData: 'username'},
        {title: 'Email', width: 110, cellData: 'email'},
        {title: 'Role', width: 40, cellData: 'role'},
        {title: 'Likes', width: 20, cellData: 'favoriteMoviesLength'},
        {title: '', width: deleteIconSize, cellComponent: deleteIcon},
    ];

    const reloadUsers = async () => {
        setLocalLoading(true);
        const result = await loadUsers();
        const updatedUsers = result.map(user => ({
            ...user,
            favoriteMoviesLength: user.favoriteMovies.length
        }));
        setUsers(updatedUsers);
        setLocalLoading(false);
    };

    useEffect(() => {
        reloadUsers();
    }, [user]);

    const handleDeleteUser = async (userId) => {
        if (localLoading) return;
        confirmAlert({
            title: 'Delete Account',
            onConfirm: async () => {
                await deleteUserById(userId).then(() => {
                    console.log('Account is deleted');
                    reloadUsers();
                });
            },
            isDestructive: true
        });
    };

    return (
        <SafeAreaView className={'flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} horizontal={true} showsHorizontalScrollIndicator={true} showsVerticalScrollIndicator={false}>
                <View className="flex-1 min-h-[85vh] m-3">
                    <View className="flex-row m-3">
                        <Title title={'Users'} viewClassName={'ml-8 mr-2'}/>
                        {localLoading && <LoadingIndicator styles={'m-1'} center={false} size={'small'}/>}
                    </View>

                    {!localLoading && (
                        <View className="bg-gray-800 rounded-md overflow-hidden">
                            <TableHeaders tableParams={tableParams}/>
                            {users.map((user, index) => (
                                <View key={user._id} className={`flex-row py-2 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
                                    {tableParams.map((param) => (
                                        <TableCell key={param.title} tableParam={param} user={user}/>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                    <BackButton/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Users;
