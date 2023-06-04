import { Button, Flex, Text, Title } from '@mantine/core'
import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from "../Firebase/Firebase";

const LoggedInButError = () => {

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Redirect to login page on successful logout
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

  return (
    <>
     <Flex direction={'column'} justify={'center'} align={'center'}>
        <Title order={2} style={{ marginBottom: "20px", textAlign: "center" }}>
            😱 You are logged in, but there appears to be an issue. Please login again.
        </Title>
        <Text c='dimmed'>Error Role Not Defined in Local Storage : ERRL2910</Text>
        <Button variant="light" color="red" onClick={handleLogout}>Log Out</Button>
     </Flex>
    </>
  )
}

export default LoggedInButError