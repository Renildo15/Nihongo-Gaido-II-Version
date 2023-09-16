import React from "react";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "@/utils";
import { useRouter } from "next/router";
import axios from "axios";


export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
  return redirectIfNoCredentials({req, res});
}

export default function Home() {

  const router = useRouter();

  const logout = () => {
    axios.post("/api/auth/logout").catch(() => router.push("/login"))
  } 

  return (
    <>
      <h1>Home</h1>
      <Button onPress={logout}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </>

  );
}