import "./AdminPerformance.css";
import React, { useEffect, useState } from "react";
import { Button, Center, Input, Menu, Paper, Table, TextInput, Title } from "@mantine/core";
import { onValue, push, ref, remove, set, update } from "firebase/database";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { database } from "../../Firebase/Firebase";

const AdminPerformance1 = () => {
    const [showAddGoal, setShowAddGoal] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newUserData, setNewUserData] = useState({
        Goal: "",
        Owner: "",
        StartDate: "",
        EndDate: "",
        Progress: "",
    });
    const [chartData, setChartData] = useState([]);

    const [goals, setGoals] = useState([]);

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

    useEffect(() => {
        const goalsRef = ref(database, "Admin/goals");
        const unsubscribe = onValue(goalsRef, (snapshot) => {
            const goalsData = snapshot.val();
            const goalsList = goalsData
                ? Object.entries(goalsData).map(([id, goal]) => ({ id, ...goal }))
                    .filter((goal) => goal.AddedByUID === user.uid) // Filter goals by user ID
                : [];
            setGoals(goalsList);
        });

        return () => {
            // Unsubscribe from the database reference when component unmounts
            unsubscribe();
        };
    }, [user.uid]); // Add user.uid as a dependency to the useEffect hook

    const handleSaveUser = () => {
        const goalsRef = ref(database, "Admin/goals");

        const newGoal = {
            Goal: newUserData.Goal,
            Owner: newUserData.Owner,
            StartDate: newUserData.StartDate,
            EndDate: newUserData.EndDate,
            Progress: newUserData.Progress,
            AddedByUID: user.uid,
        };

        const goalRef = push(goalsRef); // Generate a unique ID for the new goal

        set(goalRef, newGoal)
            .then(() => {
                const goalId = goalRef.key; // Retrieve the goal ID
                setNewUserData({
                    Goal: "",
                    Owner: "",
                    StartDate: "",
                    EndDate: "",
                    Progress: "",
                });
                setIsMenuOpen(false);
            })
            .catch((error) => {
                console.error("Error saving goal:", error);
            });
    };

    // ...
    const handleDeleteGoal = (goalId) => {
        const goalRef = ref(database, `Admin/goals/${goalId}`);
        remove(goalRef)
            .then(() => {
                console.log("Goal deleted:", goalId);
                const updatedGoals = goals.filter((goal) => goal.id !== goalId);
                setGoals(updatedGoals);
            })
            .catch((error) => {
                console.error("Error deleting goal:", error);
            });
    };
    useEffect(() => {
        fetchChartData(user.uid);
    }, [user.uid]);
    const fetchChartData = (userId) => {
        const goalsRef = ref(database, "Admin/goals");
        onValue(goalsRef, (snapshot) => {
            const goalsData = snapshot.val();
            const goalsList = goalsData
                ? Object.entries(goalsData)
                    .map(([id, goal]) => ({ id, ...goal }))
                    .filter((goal) => goal.AddedByUID === userId)
                : [];
            const chartData = [];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthlyProgress = Array(12).fill(0);
            goalsList.forEach((goal) => {
                const progress = parseInt(goal.Progress);
                const startDate = new Date(goal.StartDate);
                const monthIndex = startDate.getMonth();
                monthlyProgress[monthIndex] += progress;
            });
            monthlyProgress.forEach((progress, index) => {
                const averageProgress = progress / goalsList.length;
                chartData.push({ name: months[index], value: averageProgress });
            });
            setChartData(chartData);
        });
    };




    return (
        <div>

            <main>
                <div className="container">
                    <h2>Performance Goals</h2>
                    <AdminMenuPerformance
                        isMenuOpen={isMenuOpen}
                        handleMenuToggle={handleMenuToggle}
                        handleInputChange={handleMenuInputChange}
                        handleSaveUser={handleSaveUser}
                        newUserData={newUserData}
                        setIsMenuOpen={setIsMenuOpen} // Pass setIsMenuOpen as a prop
                    />
                    <table className="mt-5">
                        <thead>
                            <tr>
                                <th>Goal</th>
                                <th>Owner</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Progress</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="goalsTableBody">
                            {goals.map((goal, index) => (
                                <tr key={index}>
                                    <td>{goal.Goal}</td>
                                    <td>{goal.Owner}</td>
                                    <td>{goal.StartDate}</td>
                                    <td>{goal.EndDate}</td>
                                    <td>{goal.Progress}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            className="btn btn-primary"
                                            onClick={() => handleDeleteGoal(goal.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 style={{ marginTop: "10px" }} >Line Chart</h2>
                    <LineChart width={800} height={400} data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#007bff"
                            strokeWidth={3}
                            dot={false} // Set dot prop to false
                        />
                    </LineChart>

                    <hr />
                </div>


            </main>

            <footer>
                <p>All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AdminPerformance1;

export const AdminMenuPerformance = ({
    isMenuOpen,
    handleMenuToggle,
    handleInputChange,
    handleSaveUser,
    newUserData,
    setIsMenuOpen, // Add setIsMenuOpen prop
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
                    ml={30}
                    size="sm"
                    onClick={handleMenuToggle}
                >
                    Add Goal
                </Button>
            </Menu.Target>

            <Menu.Dropdown style={{ padding: "1rem" }}>
                <h2 style={{ marginBottom: "1rem" }}>Add User</h2>
                <TextInput
                    label="Owner"
                    size="lg"
                    style={{ marginBottom: "0.5rem" }}
                    value={newUserData.Owner}
                    name="Owner"
                    onChange={handleInputChange}
                />
                <TextInput
                    label="Goal"
                    size="lg"
                    style={{ marginBottom: "0.5rem" }}
                    value={newUserData.Goal}
                    name="Goal"
                    onChange={handleInputChange}
                />
                <TextInput
                    label="Start Date"
                    size="lg"
                    style={{ marginBottom: "0.5rem" }}
                    value={newUserData.StartDate}
                    name="StartDate"
                    onChange={handleInputChange}
                    type="date" // Set input type to "date"
                />
                <TextInput
                    label="End Date"
                    size="lg"
                    style={{ marginBottom: "0.5rem" }}
                    value={newUserData.EndDate}
                    name="EndDate"
                    onChange={handleInputChange}
                    type="date" // Set input type to "date"
                />
                <TextInput
                    label="Progress"
                    size="lg"
                    style={{ marginBottom: "0.5rem" }}
                    value={newUserData.Progress}
                    name="Progress"
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
                    <Button className="btn btn-primary" size="sm" onClick={handleSaveUser}>
                        Save
                    </Button>
                </div>
            </Menu.Dropdown>
        </Menu>
    );
};
