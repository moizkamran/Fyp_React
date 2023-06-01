import PerformancePercentage from "./PerformancePercentage";
import React from "react";
import { Avatar, Button, Center, Col, Divider, Flex, Paper, Text, Title } from "@mantine/core";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 200 },
    { name: "May", value: 600 },
    { name: "Jun", value: 400 },
];

const LineChartComponent = () => {
    return (
        <div>
            <PerformancePercentage />
            <Center>
                <Flex>
                    <Paper elevation={3} style={{ padding: 20, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", marginBottom: 20 }}>
                        <h2>Line Chart</h2>
                        <LineChart width={400} height={300} data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={3} />
                        </LineChart>
                    </Paper>
                    <Paper elevation={3} style={{ padding: 20, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", marginBottom: 20 }}>
                        <h2>Line Chart</h2>
                        <LineChart width={400} height={300} data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={3} />
                        </LineChart>
                    </Paper>

                </Flex> </Center>
        </div >
    );
};

export default LineChartComponent;
