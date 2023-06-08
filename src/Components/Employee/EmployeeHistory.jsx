import "./EmployeeHistory.css";
import React, { useEffect, useState } from "react";
import { onValue, push, ref, remove, set } from "firebase/database";
import { database } from "../../Firebase/Firebase";

const EmployeeHistory = () => {
    const [performanceData, setPerformanceData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Get the form values
        const year = document.getElementById("year").value;
        const quarter = document.getElementById("quarter").value;
        const score = document.getElementById("score").value;
        const comment = document.getElementById("comment").value;

        // Create a new entry in the database under "Employee/History"
        const newEntryRef = push(ref(database, "Employee/History"));
        const newEntryKey = newEntryRef.key;

        // Set the values for the new entry
        const entryData = {
            year,
            quarter,
            score,
            comment,
        };

        set(newEntryRef, entryData)
            .then(() => {
                console.log("Entry added successfully");
                // Reset the form
                document.getElementById("add-form").reset();
            })
            .catch((error) => {
                console.error("Error adding entry: ", error);
            });
    };
    const handleEdit = (entryId) => {
        // Find the index of the entry in the performanceData array
        const entryIndex = performanceData.findIndex((entry) => entry.id === entryId);
        if (entryIndex !== -1) {
            // Get the current entry data
            const currentEntry = performanceData[entryIndex];

            // Prompt the user to enter the updated values (you can use a modal or a form)
            const updatedYear = prompt("Enter the updated year:", currentEntry.year);
            const updatedQuarter = prompt("Enter the updated quarter:", currentEntry.quarter);
            const updatedScore = prompt("Enter the updated score:", currentEntry.score);

            // Perform any necessary validation on the updated values

            // Update the entry in the database
            const entryRef = ref(database, `Employee/History/${entryId}`);
            set(entryRef, {
                ...currentEntry,
                year: updatedYear,
                quarter: updatedQuarter,
                score: updatedScore,
            })
                .then(() => {
                    console.log("Entry updated successfully");
                })
                .catch((error) => {
                    console.error("Error updating entry: ", error);
                });
        }
    };


    const handleDelete = (entryId) => {
        // Delete the entry from the database
        const entryRef = ref(database, `Employee/History/${entryId}`);
        remove(entryRef)
            .then(() => {
                console.log("Entry deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting entry: ", error);
            });
    };

    useEffect(() => {
        const historyRef = ref(database, "Employee/History");
        onValue(historyRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const performanceArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                setPerformanceData(performanceArray);
            }
        });
    }, []);

    return (
        <div>

            <main>
                <div className="container">
                    <h1>Performance History</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Quarter</th>
                                <th>Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="performanceTableBody">
                            {performanceData.map((entry) => (
                                <tr key={entry.id}>
                                    <td>{entry.year}</td>
                                    <td>{entry.quarter}</td>
                                    <td>{entry.score}</td>
                                    <td>
                                        <button onClick={() => handleEdit(entry.id)}>Edit</button>
                                        <button onClick={() => handleDelete(entry.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="add-performance">
                    <h2>Add Performance</h2>

                    <form id="add-form" onSubmit={handleSubmit}>
                        <label htmlFor="year">Year:</label>
                        <input type="number" name="year" id="year" required />
                        <label htmlFor="quarter">Quarter:</label>
                        <select name="quarter" id="quarter" required>
                            <option value="">Select Quarter</option>
                            <option value="Q1">Q1</option>
                            <option value="Q2">Q2</option>
                            <option value="Q3">Q3</option>
                            <option value="Q4">Q4</option>
                        </select>
                        <label htmlFor="score">Score:</label>
                        <input type="number" name="score" id="score" required />
                        <label htmlFor="comment">Comment:</label>
                        <textarea name="comment" id="comment"></textarea>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </main>
            <footer>
                <p>&copy; All rights reserved.</p>
            </footer>


        </div>
    );
}

export default EmployeeHistory;
