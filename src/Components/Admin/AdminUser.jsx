import "./AdminUser.css";
import React, { useEffect, useState } from "react";
import { off, onValue, push, ref } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import { database } from "../../Firebase/Firebase";

import {
    Button,
    Center,
    Flex,
    Menu,
    Table,
    TextInput,
    Title,
} from "@mantine/core";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const AdminUser = () => {
    const [userData, setUserData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUserData, setFilteredUserData] = useState([]);

    useEffect(() => {
        const usersRef = ref(database, "Employees/Data");

        const fetchData = () => {
            onValue(usersRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const userList = Object.values(data);
                    setUserData(userList);
                    setFilteredUserData(userList);
                }
            });
        };

        fetchData();

        return () => {
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
        password: "",
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
        const auth = getAuth(); // Get the Firebase Auth instance
        const usersRef = ref(database, "Employees/Data");
        const newUser = {
            [newUserData.email]: {
              name: newUserData.name,
              permission: newUserData.permission,
              password: newUserData.password,
            }
          };
                 
      
        createUserWithEmailAndPassword(auth, newUserData.email, newUserData.password)
          .then((userCredential) => {
            // User creation successful
            const user = userCredential.user;
            console.log("User created:", user);
      
            // Save user data in the Realtime Database
            push(usersRef, newUser)
              .then(() => {
                console.log(newUser);
                setUserData((prevData) => [...prevData, newUser]);
                setNewUserData({
                  email: "",
                  name: "",
                  permission: "",
                  password: "",
                });
                setIsMenuOpen(false);
              })
              .catch((error) => {
                console.error("Error saving user data:", error);
              });
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
      };

      



    const handleSearchInputChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        filterData();
    };

    const filterData = () => {
        const filteredData = userData.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUserData(filteredData);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedRows = filteredUserData.slice(startIndex, endIndex);
    const [editRowIndex, setEditRowIndex] = useState(-1);

    const handleEditButtonClick = (index) => {
        setEditRowIndex(index);
    };

    const handleSaveButtonClick = (index) => {
        const updatedUser = { ...displayedRows[index] };

        const userChangesRef = ref(database, "Employees/ChangedData");

        push(userChangesRef, updatedUser)
            .then((newUserRef) => {
                const newUserId = newUserRef.key;
                updatedUser.userId = newUserId;

                console.log("User saved:", updatedUser);

                const updatedUserData = [...userData];
                updatedUserData.splice(startIndex + index + 1, 0, updatedUser);
                setUserData(updatedUserData);
                setEditRowIndex(-1);
            })
            .catch((error) => {
                console.error("Error saving user:", error);
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
                    style={{ margin: "0 0.25rem" }}
                >
                    {i}
                </Button>
            );
        }

        return pageNumbers;
    };

    return (
        <div>
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
                                <th>Password</th>

                                <th>Permissions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedRows.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        {/* Render the name input field if in edit mode, otherwise display the name */}
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
                                        {/* Render the email input field if in edit mode, otherwise display the email */}
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
                                        {/* Render the password input field if in edit mode, otherwise display the password */}
                                        {editRowIndex === index ? (
                                            <input
                                                type="text"
                                                name="password"
                                                value={row.password}
                                                onChange={(event) => handleEditInputChange(event, index)}
                                            />
                                        ) : (
                                            row.password
                                        )}
                                    </td>
                                    <td>
                                        {/* Render the permission input field if in edit mode, otherwise display the permission */}
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
                                                {/* Render the Save and Cancel buttons when in edit mode */}
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
                                                {/* Render the Edit and Delete buttons when not in edit mode */}
                                                <Button
                                                    size="sm"
                                                    className="btn btn-primary"
                                                    onClick={() => handleEditButtonClick(index)}
                                                >
                                                    Edit
                                                </Button>

                                            </>
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
                    label="Password"
                    size="lg"
                    style={{ marginBottom: "0.5rem" }}
                    value={newUserData.password}
                    name="password"
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