import React from "react";
import { Button, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";

const AdminDashboardContent = () => {
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
                    placeholder="User Permission"
                    style={{ marginRight: "1rem", flex: "0.5" }}
                    name="" id="">

                    <option value="admin">Admin</option>
                    <option value="user">User</option>

                </select>

                <Button>Add</Button>
            </div>
        </div>
    );
};

export default AdminDashboardContent;
