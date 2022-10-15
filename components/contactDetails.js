import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { readContact } from "../actions/contactActions";

const ShowContact = ({ route, navigation, store }) => {
    const { contactId } = route.params;
    const dispatch = useDispatch();
    const contact = store == null
        ? useSelector((state) => state.contactStore.contact)
        : store.getState().contactStore.contact[contactId];
    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [phoneNumber, setPhoneNumber] = useState(" ");
    const [image, setImage] = useState(image);

    useEffect(() => {
        if (contact != null) {
            setFirstName(contact.firstName);
            setLastName(contact.lastName);
            setPhoneNumber(contact.phoneNumber);
            setEmail(contact.email);
            setImage(contact.image);
        }
        dispatch(readContact(contactId));
    }, [contact]);

    return (
        <View style={styles.topView}>
            <View style={styles.bottomSheetCenter}>
                <View style={styles.imageBackGroundView}>
                    <ImageBackground
                        source={{
                            uri: image,
                        }}
                        style={styles.imageBackGround}
                        imageStyle={{ borderRadius: 45 }}></ImageBackground>
                </View>
                <Text style={styles.photoText}>Photo</Text>
            </View>

            <View style={styles.photoInfoSpace}>
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name="account-box" color="#511e31" size={20} />
                        <Text testID="name" style={styles.detailsText}>
                            {firstName} {lastName}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="phone" color="#4b51fc" size={20} />
                        <Text style={styles.detailsText}>{phone}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#f25c95" size={20} />
                        <Text style={styles.detailsText}>{email}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <TouchableOpacity
                    testID="editcontact"
                    style={styles.commandButton}
                    onPress={() =>
                        navigation.navigate("AddContact", {
                            contactId: contactId,
                            createOrEdit: false,
                        })
                    }>
                    <Text style={styles.panelButtonTitle}>Edit Contact</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ShowContact;

const styles = StyleSheet.create({
    commandButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#000080",
        alignItems: "center",
        marginTop: 10,
    },
    bottomSheetCenter: {
        alignItems: "center",
    },
    topView: {
        flex: 1,
    },
    photoText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    imageBackGround: {
        height: 100,
        width: 100,
        backgroundColor: "#FFE4C4",
        borderRadius: 45,
    },
    imageBackGroundView: {
        height: 100,
        width: 100,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    photoInfoSpace: {
        marginTop: 20,
    },
    detailsText: {
        color: "#777777",
        fontWeight: "bold",
        marginLeft: 20,
    },
    panelButtonTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },

});