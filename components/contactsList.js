import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import Contact from "./contactsMain";
import { TouchableOpacity } from "react-native";

function Contacts({ navigation, store }) {
    let searchedContacts = null;
    const contacts = store == null
        ? useSelector((state) => state.contactStore.contacts)
        : store.getState().contactStore.contacts;
    const newRandomId = Math.random();
    const [search, setsearch] = useState(" ");
    if (search === " ") {
        searchedContacts = contacts.map((contact) => (
            <Contact contact={contact} key={contact.id} />
        ));
    }
    else {
        searchedContacts = contacts.filter((contact) => {
            const contactLower = (
                contact.firstName + " " + contact.lastName
            ).toLowerCase();
            const searchLower = search.toLowerCase;
            return contactLower.indexOf(searchLower) > -1;
        }).map((contact) => <Contact contact={contact} key={contact.id} />);
    }


    const HeaderSearch = () => {
        return (
            <SearchBar round searchIcon={{ size: 24 }} testID="searchbar"
                onChangeText={(text) => setsearch(text)}
                onClear={(text) => setsearch("")}
                value={search}
                keyboardType="ascii-capable" />
        )
    }

    return (
        <>
            <HeaderSearch />
            <ScrollView>
                <ListItem>{searchedContacts}</ListItem>
            </ScrollView>
            <View>
                <TouchableOpacity testID="addContactBtn" style={styles.coolStyle}
                    onPress={() => navigation.navigate("AddContact", {
                        contactId: newRandomId,
                        createOrEdit: true,
                    })}>
                    <Text style={styles.btnStyle}>Add New Contact</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Contacts;

const styles = StyleSheet.create({
    coolStyle: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F0F8FF",
        alignItems: "center",
        marginTop: 10,
    },
    btnStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    }
})