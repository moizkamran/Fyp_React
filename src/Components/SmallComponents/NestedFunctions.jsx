import React, { useState } from "react";
import { Button, Center, Flex, Menu, Table, TextInput } from "@mantine/core";

export const AdminMenuComponent = () => {
    const [userData, setUserData] = useState([
        { email: 'user1@example.com', name: 'John Doe', status: 'Active', permission: 'Operational' },
        // Additional user data can be added here
    ]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newUserData, setNewUserData] = useState({
        email: '',
        name: '',
        permission: '',
    });

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveUser = () => {
        setUserData((prevData) => [...prevData, newUserData]);
        setNewUserData({
            email: '',
            name: '',
            permission: '',
        });
        setIsMenuOpen(false);
    };
    return (
        <>
            <Menu
                width={300}
                shadow="md"
                opened={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                style={{ marginBottom: '1rem' }}
            >
                <Menu.Target>
                    <Button ml={30} size="sm" onClick={handleMenuToggle}>
                        Add User
                    </Button>
                </Menu.Target>

                <Menu.Dropdown style={{ padding: '1rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Add User</h2>
                    <TextInput
                        label="Name"
                        size="lg"
                        style={{ marginBottom: '0.5rem' }}
                        value={newUserData.name}
                        name="name"
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Email"
                        size="lg"
                        style={{ marginBottom: '0.5rem' }}
                        value={newUserData.email}
                        name="email"
                        onChange={handleInputChange}
                    />
                    <TextInput
                        label="Permission"
                        size="lg"
                        style={{ marginBottom: '0.5rem' }}
                        value={newUserData.permission}
                        name="permission"
                        onChange={handleInputChange}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <Button size="sm" style={{ marginRight: '0.5rem' }} onClick={() => setIsMenuOpen(false)}>
                            Cancel
                        </Button>
                        <Button size="sm" onClick={handleSaveUser}>
                            Save
                        </Button>
                    </div>
                </Menu.Dropdown>
            </Menu>
        </>
    )

}


const NestedFunctions = () => {
    return (
        <div>

        </div>
    )
}

export default NestedFunctions
