import React, { useState } from "react";
import { Button, Center, Flex, Menu, Table, TextInput } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { FaSearch } from "react-icons/fa";

function AdminDashboardContent() {
    const [userData, setUserData] = useState([
        { email: 'user1@example.com', name: 'John Doe', status: 'Active', permission: 'Operational' },
        // Additional user data can be added here
    ]);

    const rowsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newUserData, setNewUserData] = useState({
        email: '',
        name: '',
        permission: '',
    });

    const totalRows = userData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
                    {i}
                </Button>
            );
        }

        return pageNumbers;
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedRows = userData.slice(startIndex, endIndex);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    alignItems: 'center',
                }}
            >
                <h1>User's List</h1>
            </div>
            <Flex>

                <TextInput
                    placeholder="Search User Name"
                    icon={<FaSearch />}
                    style={{ marginRight: "1rem", flex: "1" }}
                />


                <Button>Search</Button>
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
            </Flex>
            <Center>
                <Table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th colSpan="2">User Permission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.email}</td>
                                <td>{row.name}</td>
                                <td>{row.permission}</td>
                                <td>
                                    <Button size="sm">Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Center>

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
                {renderPageNumbers()}
            </div>
        </div>
    );
}

export default AdminDashboardContent;
