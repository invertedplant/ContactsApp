import React from "react";
import {
    Alert,
    StyleSheet,
    TouchableOpacity,
    Text
} from "react-native";
import { Avatar } from "react-native-elements";
import { ListItem, Left, Right, Body } from "native-base"
import { useDispatch } from "react-redux";
import { deleteContact } from "../actions/contactActions";
import { DELETE_PROMPT_MSG } from "../constants/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"

const Contact = ({ contact }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // only display email on the contact page itself or else it gets really long
    const { firstName, lastName, phoneNumber, id, image } = contact;
    const avatarDisplayName = firstName.concat(" ").concat(lastName);
    const toDelete = () => {
        Alert.alert("Deleting contact.", DELETE_PROMPT_MSG,
            [
                { text: "YES", onPress: () => dispatch(deleteContact(id)) },
                { text: "NO" },
            ]);
    };

    // set up the icon
    let avatarImg = null;
    if (image === null) {
        avatarImg = <Avatar rounded title={avatarDisplayName} size="small" />;
    }
    else {
        const src = { uri: image };
        avatarImg = <Avatar rounded source={src} size="small" />;
    }

    // set up the display
    return (
        <>
            <ListItem avatar>
                <TouchableOpacity testID="navigateDetails"
                    style={styles.touchableOpacityStyle}
                    onPress={() => navigation.navigate("Details", { contactId: id })}>
                    <Left>{avatarImg}</Left>
                    <Body style={styles.bodyStyle}>
                        <Text style={styles.textStyle}>
                            {firstName} {lastName}
                        </Text>
                        <Text style={styles.numberStyle}>{phoneNumber}</Text>
                    </Body>
                    <Right style={styles.iconStyle}>
                        <MaterialIcons name="delete" testID="deleteContact"
                            size={20} onPress={() => toDelete()}
                        />
                        <MaterialIcons name="info" testID="infoContact"
                            size={20} onPress={() => navigation.navigate("Details", { contactId: id })}
                        />
                        <MaterialIcons name="edit" testID="editContact"
                            size={20} onPress={() => navigation.navigate("AddContact",
                                {
                                    contactId: id,
                                    createOrEdit: false,
                                })}
                        />
                    </Right>
                </TouchableOpacity>
            </ListItem>
        </>
    );
};
export default Contact;


const styles = StyleSheet.create({
    bottomView: {
        width: "30%",
        height: 40,
        backgroundColor: "#F0F8FF", //Alice Blue
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        borderRadius: 30,
    },
    textStyle: {
        fontSize: 16,
        color: "black",
    },
    numberStyle: {
        fontSize: 16,
        color: "red",
    },
    touchableOpacityStyle: {
        flexDirection: "row",
    },
    bodyStyle: {
        padding: 5,
    },
    iconStyle: {
        flexDirection: "row",
        alignItems: "center",
    },
});

