import "./AdminUser.css";
import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Menu, Table, TextInput, Title } from "@mantine/core";
import { off, onValue, push, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import { database } from "../../Firebase/Firebase";

const AdminUser = () => {

    const [userData, setUserData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUserData, setFilteredUserData] = useState([]);

    useEffect(() => {
        const usersRef = ref(database, "Employees/Profile");

        const fetchData = () => {
            onValue(usersRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const userList = Object.values(data);
                    setUserData(userList);
                }
            });
        };

        fetchData();

        // Clean up the listener when the component unmounts
        return () => {
            // Detach the event listener
            off(usersRef);
        };
    }, []);

    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newUserData, setNewUserData] = useState({
        email: "",
        name: "",
        permission: "",
    });

    const totalRows = filteredUserData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuInputChange = (event) => {
        const { name, value } = event.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditInputChange = (event, index) => {
        const { name, value } = event.target;
        const updatedUserData = [...userData];
        updatedUserData[index][name] = value;
        setUserData(updatedUserData);
    };

    const handleSaveUser = () => {
        const usersRef = ref(database, "Employees/Data");

        const newUser = {
            email: newUserData.email,
            name: newUserData.name,
            permission: newUserData.permission,
        };

        push(usersRef, newUser)
            .then(() => {
                console.log("User saved:", newUser);
                setUserData((prevData) => [...prevData, newUser]);
                setNewUserData({
                    email: "",
                    name: "",
                    permission: "",
                });
                setIsMenuOpen(false);
            })
            .catch((error) => {
                console.error("Error saving user:", error);
            });
    };

    const handleSearchInputChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
    };

    useEffect(() => {
        const filteredData = userData.filter((user) =>
            user && user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUserData(filteredData);
    }, [searchQuery, userData]);


    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedRows = filteredUserData.slice(startIndex, endIndex);
    const [editRowIndex, setEditRowIndex] = useState(-1);

    const handleEditButtonClick = (index) => {
        setEditRowIndex(index);
    };

    const handleSaveButtonClick = (index) => {
        const updatedUser = { ...displayedRows[index] };

        const userChangesRef = ref(database, 'Employees/ChangedData');

        push(userChangesRef, updatedUser)
            .then((newUserRef) => {
                const newUserId = newUserRef.key;
                updatedUser.userId = newUserId;

                console.log('User saved:', updatedUser);

                const updatedUserData = [...userData];
                updatedUserData.splice(startIndex + index + 1, 0, updatedUser);
                setUserData(updatedUserData);
                setEditRowIndex(-1);
            })
            .catch((error) => {
                console.error('Error saving user:', error);
            });
    };


    const handleCancelEditButtonClick = () => {
        setEditRowIndex(-1);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={i === currentPage}
                    style={{ margin: "0 0.25rem" }} // Add margin to create space between buttons
                >
                    {i}
                </Button>
            );
        }

        return pageNumbers;
    };
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg px-5">
                    <div className="container-fluid d-flex justify-content-center">
                        <a className="navbar-brand text-white" href="#">User</a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse justify-content-center"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="/AdminUser">
                                        User Management
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="/AdminPerformance">
                                        Performance Management
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="admin_careerpath.html">
                                        Career Pathing
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="admin_report.html">
                                        Reports
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="General/main.html">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="user ms-auto">
                            <p>
                                Welcome, <span className="username">Admin</span>
                            </p>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <div className="container">
                    <h2>Users</h2>
                    <Flex>
                        <TextInput
                            placeholder="Search User Name"
                            icon={<FaSearch />}
                            style={{ marginRight: "1rem", flex: "1" }}
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />

                        <AdminMenuComponent
                            isMenuOpen={isMenuOpen}
                            handleMenuToggle={handleMenuToggle}
                            handleInputChange={handleMenuInputChange}
                            handleSaveUser={handleSaveUser}
                            newUserData={newUserData}
                        />
                    </Flex>                   <table id="userTable">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Permissions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedRows.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        {editRowIndex === index ? (
                                            <input
                                                type="text"
                                                name="email"
                                                value={row.email}
                                                onChange={(event) => handleEditInputChange(event, index)}
                                            />
                                        ) : (
                                            row.email
                                        )}
                                    </td>
                                    <td>
                                        {editRowIndex === index ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={row.name}
                                                onChange={(event) => handleEditInputChange(event, index)}
                                            />
                                        ) : (
                                            row.name
                                        )}
                                    </td>
                                    <td>
                                        {editRowIndex === index ? (
                                            <input
                                                type="text"
                                                name="permission"
                                                value={row.permission}
                                                onChange={(event) => handleEditInputChange(event, index)}
                                            />
                                        ) : (
                                            row.permission
                                        )}
                                    </td>
                                    <td>
                                        {editRowIndex === index ? (
                                            <>
                                                <Button
                                                    size="sm"
                                                    className="btn btn-primary"

                                                    onClick={() => handleSaveButtonClick(index)}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="btn btn-primary"

                                                    onClick={() => handleCancelEditButtonClick()}
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    size="sm"
                                                    className="btn btn-primary"
                                                    onClick={() => handleEditButtonClick(index)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    ml={10}
                                                    size="sm"
                                                    className="btn btn-primary"
                                                >
                                                    Delete
                                                </Button></>


                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <Center mt={5}>
                        {/* Pagination buttons */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Button
                                className="btn btn-primary"

                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                variant={currentPage === index + 1 ? "filled" : "outline"}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </Center>

                    <hr />


                </div>
            </main>

            <footer>
                <p>All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AdminUser;
export const AdminMenuComponent = ({
    isMenuOpen,
    handleMenuToggle,
    handleInputChange,
    handleSaveUser,
    newUserData,
}) => {
    return (
        <Menu
            width={300}
            shadow="md"
            opened={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            style={{ marginBottom: "1rem" }}
        >
            <Menu.Target>
                <Button
                    className="btn btn-primary"

                    ml={30} size="sm" onClick={handleMenuToggle}>
                    Add User
                </Button>
            </Menu.Target>

            <Menu.Dropdown style={{ padding: "1rem" }}>
                <h2 style={{ marginBottom: "1rem" }}>Add User</h2>
                <TextInput
                    label="Name"
                    size="lg"
                    style={{ marginBottom: "0.5rem" }}
                    value={newUserData.name}
                    name="name"
                    onChange={handleInputChange}
                />
                <TextInput
                    label="Email"
                    size="lg"
                    style={{ marginBottom: "0.5rem" }}
                    value={newUserData.email}
                    name="email"
                    onChange={handleInputChange}
                />
                <TextInput
                    label="Permission"
                    size="lg"
                    style={{ marginBottom: "0.5rem" }}
                    value={newUserData.permission}
                    name="permission"
                    onChange={handleInputChange}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "1rem",
                    }}
                >
                    <Button
                        className="btn btn-primary"
                        size="sm"
                        style={{ marginRight: "0.5rem" }}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="btn btn-primary"
                        size="sm" onClick={handleSaveUser}>
                        Save
                    </Button>
                </div>
            </Menu.Dropdown>
        </Menu>
    );
};