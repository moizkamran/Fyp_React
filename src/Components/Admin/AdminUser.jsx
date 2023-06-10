import "react-toastify/dist/ReactToastify.css";
import "./AdminUser.css";
import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Menu, TextInput } from "@mantine/core";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { off, onValue, push, ref, remove } from "firebase/database";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { database } from "../../Firebase/Firebase";

const AdminUser = () => {
    const [userData, setUserData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUserData, setFilteredUserData] = useState([]);
    const [displayedRows, setDisplayedRows] = useState([]);
    const [editRowIndex, setEditRowIndex] = useState(-1);
    const [newUserData, setNewUserData] = useState({
        email: "",
        name: "",
        permission: "",
        password: "",
    });

    useEffect(() => {
        const usersRef = ref(database, "Employees/Data");
      
        const fetchData = () => {
          onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const userList = Object.entries(data).map(([uid, user]) => ({
                uid,
                ...user,
              }));
              setUserData(userList);
              console.log("User data fetched:", userList);
      
              // Store the user data in localStorage
              localStorage.setItem("userData", JSON.stringify(userList));
            }
          });
        };
      
        // Check if there is user data in localStorage
        const existingUserData = JSON.parse(localStorage.getItem("userData"));
        if (existingUserData && existingUserData.length > 0) {
          setUserData(existingUserData);
        } else {
          fetchData();
        }
      
        // Clean up the listener when the component unmounts
        return () => {
          // Detach the event listener
          off(usersRef);
        };
      }, []);
      

    const rowsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        const auth = getAuth();
        const usersRef = ref(database, "Employees/Data");

        createUserWithEmailAndPassword(auth, newUserData.email, newUserData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User created:", user);

                push(usersRef)
                    .then((newUserRef) => {
                        const newUserId = newUserRef.key;
                        const newUser = {
                            [newUserId]: {
                                name: newUserData.name,
                                permission: newUserData.permission,
                                password: newUserData.password,
                            },
                        };

                        console.log("User saved:", newUser);

                        setUserData((prevData) => [...prevData, newUser]);
                        setNewUserData({
                            email: "",
                            name: "",
                            permission: "",
                            password: "",
                        });
                        setIsMenuOpen(false);
                        toast.success("User added");
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
    };

    useEffect(() => {
        const filteredData = userData.filter(
            (user) =>
                user &&
                user.name &&
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUserData(filteredData);
    }, [searchQuery, userData]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const slicedRows = filteredUserData.slice(startIndex, endIndex);
        setDisplayedRows(slicedRows);
    }, [currentPage, filteredUserData]);

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
                updatedUserData.splice(
                    (currentPage - 1) * rowsPerPage + index + 1,
                    0,
                    updatedUser
                );
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

    const handleDeleteUser = (key) => {
        const userToDeleteId = key;
        console.log("User to delete:", userToDeleteId);
      
        const userRef = ref(database, `Employees/Data/${userToDeleteId}`);
        console.log("User ref:", userRef);
      
        remove(userRef)
          .then(() => {
            console.log("User deleted successfully from the database");
      
            let existingUserData = JSON.parse(localStorage.getItem("userData"));
            if (!existingUserData) {
              existingUserData = [];
            }
            const updatedUserData = existingUserData.filter(
              (user) => user.uid !== userToDeleteId
            );
            localStorage.setItem("userData", JSON.stringify(updatedUserData));
      
            setUserData(updatedUserData);
          })
          .catch((error) => {
            console.error("Error deleting user from the database:", error);
          });
      
        toast.success("User deleted successfully");
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
                            handleSaveUser={handleSaveUser} setIsMenuOpen={setIsMenuOpen} // Pass the setIsMenuOpen function as a prop
                            newUserData={newUserData} toast={toast} // Pass the toast function as a prop
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
                                                <Button
                                                    size="sm"
                                                    className="btn btn-primary"
                                                    onClick={() => handleDeleteUser(row.uid)}
                                                >
                                                    Delete
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
                            <Button ml={5}
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
            <ToastContainer /> {/* Add the ToastContainer component */}            <footer>
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
    newUserData, toast, setIsMenuOpen
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
                />  <TextInput
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
                        onClick={() => setIsMenuOpen(false)} // Close the menu
                    >
                        Cancel
                    </Button>
                    <Button
                        className="btn btn-primary"
                        size="sm"
                        onClick={() => {
                            setIsMenuOpen(false); // Close the menu
                            handleSaveUser();
                        }}
                    >
                        Save
                    </Button>

                </div>
            </Menu.Dropdown>
        </Menu>
    );
};