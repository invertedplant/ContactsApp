import { ScrollView, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addContact, readContact, updateContact } from "../actions/contactActions";
import { ADD_SUCCESS_MSG } from "../constants/types";

function AddContact({ route, navigation, store }) {
    const { contactId, createOrEdit } = route.params;
    let contact = createOrEdit === false ? useSelector((state) => state.contactStore.contact) : null;
    contact = store == null ? contact : store.getState().contactStore.contact[contactId];

    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [phoneNumber, setPhoneNumber] = useState(" ");
    const [image, setImage] = useState(null);

    if (!createOrEdit) {
        useEffect(() => {
            if (contact !== undefined && contact !== null) {
                setFirstName(contact.firstName);
                setLastName(contact.lastName);
                setPhoneNumber(contact.phoneNumber);
                setEmail(contact.email);
                setImage(contact.image);
            }
            dispatch(readContact(contactId));
        }, [contact]);
    }

    const onContactUpdate = () => {
        const update_Contact = {
            id: contactId,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            image: image,
        };

        dispatch(
            createOrEdit === true ? addContact(update_Contact) : updateContact(update_Contact)
        );

        Alert.alert("Nice!", ADD_SUCCESS_MSG, [{ text: "Success" }]);
        navigation.navigate("Contacts");
    };


    const Title = () => {
        return (
            <View style={styles.headingView}>
                <TouchableOpacity
                    testID="navigation"
                    onPress={() => navigation.navigate("Contacts")}>
                    <Icon name="arrow-left" size={30} />
                </TouchableOpacity>
                <Text style={styles.headingText}>
                    {createOrEdit === true ? "Add Contact" : "Edit Contact"}
                </Text>
            </View>
        );
    };

    return (
        <ScrollView>
        <Title />
            <View>
                <View style={styles.fullNameRow}>
                    <TextInput
                        testID="firstName"
                        style={styles.nameTextInputStyle}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                    />
                    <TextInput
                        testID="lastName"
                        style={styles.nameTextInputStyle}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                    />
                </View>
                <TextInput
                    testID="phoneNumber"
                    style={styles.phoneEmailTextInputStyle}
                    placeholder="Phone Number"
                    value={phone}
                    keyboardType="phone-pad"
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <TextInput
                    testID="emailId"
                    style={styles.phoneEmailTextInputStyle}
                    placeholder="Email Address"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                />
                <TouchableOpacity
                    testID="submit"
                    style={styles.commandButton}
                    onPress={() => updateContact()}>
                    <Text style={styles.panelButtonTitle}>
                        {createOrEdit === true ? "Create Contact" : "Update Contact"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};
export default AddContact;


const styles = StyleSheet.create({
    nameTextInputStyle: {
        height: 40,
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 15,
        flex: 1,
        padding: 10,
    },
    phoneEmailTextInputStyle: {
        height: 40,
        borderColor: "gray",
        borderWidth: 2,
        marginTop: 10,
        borderRadius: 15,
        padding: 10,
    },
    fullNameRow: {
        flexDirection: "row",
        marginTop: 20,
    },
    headingText: {
        fontSize: 20,
        marginLeft: 20,
        fontWeight: "bold",
    },
    headingView: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    commandButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#000080",
        alignItems: "center",
        marginTop: 10,
    },
    panelButtonTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});