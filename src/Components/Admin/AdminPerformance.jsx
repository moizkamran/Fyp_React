import React, { useState } from "react";
import { Button, Center, Flex, Input, Paper, Table, Title } from "@mantine/core";

const AdminPerformance = () => {
    const [showAddGoal, setShowAddGoal] = useState(false);

    const handleAddGoal = () => {
        setShowAddGoal(true);
    };

    const handleCancelAddGoal = () => {
        setShowAddGoal(false);
    };

    return (
        <div>
            <Center mt={100}>
                <Paper shadow="sm" h={600} w={"80%"}>
                    <Title>Performance Goals</Title>

                    <Table mt={20}>
                        <thead>
                            <tr>
                                <th>Goal</th>
                                <th>Owner</th>
                                <th colSpan="2">Start Date</th>
                                <th colSpan="2">End Date</th>
                                <th colSpan="2">Progress</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>{/* Add your table rows here */}</tbody>
                    </Table>

                    {!showAddGoal && (
                        <Button onClick={handleAddGoal} style={{ marginTop: "20px" }}>
                            Add New Goal
                        </Button>
                    )}

                    {showAddGoal && (
                        <>
                            <div style={{ marginTop: "20px" }}>
                                <Flex flexDirection="column" justifyContent="space-between">
                                    <div style={{ marginBottom: "10px" }}>
                                        <label htmlFor="goal">Goal</label>
                                        <Input id="goal" placeholder="Enter goal" size="sm" />
                                    </div>
                                    <div style={{ marginBottom: "10px" }}>
                                        <label htmlFor="owner">Owner</label>
                                        <Input id="owner" placeholder="Enter owner" size="sm" />
                                    </div>
                                    <div style={{ marginBottom: "10px" }}>
                                        <label htmlFor="startDate">Start Date</label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            size="sm"
                                            style={{ marginLeft: "10px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: "10px" }}>
                                        <label htmlFor="endDate">End Date</label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            size="sm"
                                            style={{ marginLeft: "10px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: "10px" }}>
                                        <label htmlFor="progress">Progress</label>
                                        <Input id="progress" placeholder="Enter progress" size="sm" />
                                    </div>
                                </Flex>
                            </div>

                            <div style={{ marginTop: "20px" }}>
                                <Button variant="outline" onClick={handleCancelAddGoal}>
                                    Cancel
                                </Button>
                                <Button style={{ marginLeft: "10px" }}>Save</Button>
                            </div>
                        </>
                    )}
                </Paper>
            </Center>
        </div>
    );
};

export default AdminPerformance;
