import React, { useEffect, useState } from "react";
import { onValue, push, ref, set } from "firebase/database";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { database } from "../../Firebase/Firebase";

const EmployeePerformance = () => {
    const [goals, setGoals] = useState([]);
    const [goalInput, setGoalInput] = useState("");
    const [targetInput, setTargetInput] = useState("");
    const [deadlineInput, setDeadlineInput] = useState("");
    const [progressInput, setProgressInput] = useState("");
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        const goalRef = ref(database, "Employees/Performance");
        onValue(goalRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const goalsArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setGoals(goalsArray);
            } else {
                setGoals([]);
            }
        });
    }, []);

    const handleGoalInputChange = (e) => {
        setGoalInput(e.target.value);
    };

    const handleTargetInputChange = (e) => {
        setTargetInput(e.target.value);
    };

    const handleProgressInputChange = (e) => {
        setProgressInput(e.target.value);
    };

    const handleDeadlineInputChange = (e) => {
        setDeadlineInput(e.target.value);
    };

    const handleAddGoal = (e) => {
        e.preventDefault();

        const newGoal = {
            goal: goalInput,
            target: targetInput,
            deadline: deadlineInput,
            progress: progressInput,
        };

        if (editIndex !== -1) {
            // If editing an existing goal
            const updatedGoals = [...goals];
            const goalId = updatedGoals[editIndex].id;
            const goalRef = ref(database, `Employees/Performance/${goalId}`);
            set(goalRef, newGoal);
            updatedGoals[editIndex] = { ...newGoal, id: goalId };
            setGoals(updatedGoals);
            setEditIndex(-1);
        } else {
            // If adding a new goal
            const goalRef = ref(database, "Employees/Performance");
            const newGoalRef = push(goalRef);
            set(newGoalRef, newGoal);
            setGoals([...goals, { ...newGoal, id: newGoalRef.key }]);
        }

        setGoalInput("");
        setTargetInput("");
        setDeadlineInput("");
        setProgressInput("");
    };

    const handleEditGoal = (index) => {
        const goalToEdit = goals[index];
        setGoalInput(goalToEdit.goal);
        setTargetInput(goalToEdit.target);
        setDeadlineInput(goalToEdit.deadline);
        setProgressInput(goalToEdit.progress);
        setEditIndex(index);
    };

    const handleDeleteGoal = (index) => {
        const goalToDelete = goals[index];

        // Remove the goal from the database
        const goalRef = ref(database, `Employees/Performance/${goalToDelete.id}`);
        set(goalRef, null);

        // Remove the goal from the local state
        const updatedGoals = goals.filter((_, i) => i !== index);
        setGoals(updatedGoals);
    };









    return (
        <div>
            <main>
                <div className="container">
                    <h1 className="text-center">Performance Goals</h1>
                    <section

                        id="newGoal">
                        <h2>Add New Goal</h2>
                        <form id="addForm" onSubmit={handleAddGoal}>
                            <label htmlFor="goal">Goal:</label>
                            <input
                                type="text"
                                name="goal"
                                id="goal"
                                value={goalInput}
                                onChange={handleGoalInputChange}
                                required
                            />
                            <label htmlFor="target">Target:</label>
                            <input
                                type="number"
                                name="target"
                                id="target"
                                value={targetInput}
                                onChange={handleTargetInputChange}
                                required
                            />
                            <label htmlFor="deadline">Deadline:</label>
                            <input
                                type="date"
                                name="deadline"
                                id="deadline"
                                value={deadlineInput}
                                onChange={handleDeadlineInputChange}
                                required
                            />
                            <label htmlFor="progress">Progress:</label>
                            <input
                                type="number"
                                name="progress"
                                id="progress"
                                value={progressInput}
                                onChange={handleProgressInputChange}
                                required
                            />
                            <button
                                style={{ marginTop: 10, marginBottom: 10 }}
                                type="submit">
                                {editIndex !== -1 ? "Update" : "Add"}
                            </button>
                        </form>

                    </section>

                    <section id="currentGoals">
                        <h2>Current Goals</h2>
                        <table id="goalsTable">
                            <thead>
                                <tr>
                                    <th>Goal</th>
                                    <th>Target</th>
                                    <th>Deadline</th>
                                    <th>Progress</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {goals.map((goal, index) => (
                                    <tr key={index}>
                                        <td>{goal.goal}</td>
                                        <td>{goal.target}</td>
                                        <td>{goal.deadline}</td>
                                        <td>{goal.progress}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleEditGoal(index)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                style={{ marginLeft: "10px" }}
                                                className="btn btn-primary"
                                                onClick={() => handleDeleteGoal(index)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>


                </div>
            </main>
            <footer>
                <p>&copy; All rights reserved.</p>
            </footer>
        </div>
    );
};

export default EmployeePerformance;
