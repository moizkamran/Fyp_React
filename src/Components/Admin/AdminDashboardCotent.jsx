import React from "react";
import { Button, Table, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";

const AdminDashboardContent = () => {
    const userData = [
        { email: 'user1@example.com', name: 'John Doe', bank: 'ABC Bank', status: 'Active', permission: 'Operational' },
        // Additional user data can be added here
    ];

    const rows = userData.map((user) => (
        <tr key={user.email}>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.bank}</td>
            <td>{user.status}</td>
            <td>{user.permission}</td>
            <td>
                <button>Edit</button>
            </td>
        </tr>
    ));
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    alignItems: "center",
                }}
            >
                <div>User</div>
                <Button>Add User</Button>
            </div>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
                <TextInput
                    placeholder="Search User Name"
                    icon={<FaSearch />}
                    style={{ marginRight: "1rem", flex: "1" }}
                />
                <select
                    style={{ marginRight: "1rem", flex: "0.5" }}
                    name=""
                    id=""
                >
                    <option value="" disabled selected hidden>
                        User Permission
                    </option>
                    <option value="Operational">Operational</option>
                    <option value="user">User</option>
                </select>


                <Button>Add</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Bank</th>
                        <th>Status</th>
                        <th>User Permission</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <div>

            </div>

        </div>
    );
};

export default AdminDashboardContent;
