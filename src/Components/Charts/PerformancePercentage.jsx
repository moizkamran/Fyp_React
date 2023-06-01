import React from "react";
import { Avatar, Center, Divider, Flex, Paper, Text } from "@mantine/core";

const PerformancePercentage = () => {
    return (
        <div>
            <Center>
                <Paper
                    shadow="sm"
                    style={{ width: "900px", height: "160px", marginBottom: "20px", padding: "20px" }}
                >
                    <Flex justifyContent="space-between" alignItems="center" gap="lg">
                        <Flex>
                            <Avatar
                                color="cyan"
                                radius="xl"
                                size="lg"
                                style={{ fontSize: "28px", marginRight: "10px" }}
                            >
                                MK
                            </Avatar>
                            <Flex direction="column">
                                <Text>Improve Coprates Performance</Text>
                                <Text style={{ color: "blue", fontWeight: "bold", fontSize: "20px", marginTop: "4px" }}>
                                    70% /month
                                </Text>
                            </Flex>
                        </Flex>
                        <Divider orientation="vertical" margin="mx-2" />
                        <Flex>
                            <Avatar
                                color="cyan"
                                radius="xl"
                                size="lg"
                                style={{ fontSize: "28px", marginRight: "10px" }}
                            >
                                MK
                            </Avatar>
                            <Flex direction="column">
                                <Text style={{ color: "gray" }}>Employee Productivity</Text>
                                <Text style={{ color: "blue", fontWeight: "bold", fontSize: "20px", marginTop: "4px" }}>
                                    70% /month
                                </Text>
                            </Flex>
                        </Flex>
                        <Divider orientation="vertical" margin="mx-2" />
                        <Flex>
                            <Avatar
                                color="cyan"
                                radius="xl"
                                size="lg"
                                style={{ fontSize: "28px", marginRight: "10px" }}
                            >
                                MK
                            </Avatar>
                            <Flex direction="column">
                                <Text style={{ color: "gray" }}>Project Achievement</Text>
                                <Text style={{ color: "blue", fontWeight: "bold", fontSize: "20px", marginTop: "4px" }}>
                                    70% /Project/month
                                </Text>
                            </Flex>
                        </Flex>
                        <Divider orientation="vertical" margin="mx-2" />
                        <Flex>
                            <Avatar
                                color="cyan"
                                radius="xl"
                                size="lg"
                                style={{ fontSize: "28px", marginRight: "10px" }}
                            >
                                MK
                            </Avatar>
                            <Flex direction="column">
                                <Text style={{ color: "gray" }}>Key Performance Indicator</Text>
                                <Text style={{ color: "blue", fontWeight: "bold", fontSize: "20px", marginTop: "4px" }}>
                                    70% /Quatar
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Paper>
            </Center>
        </div>
    );
};

export default PerformancePercentage;