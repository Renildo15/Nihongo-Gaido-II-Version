import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "@/utils";


export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
  return redirectIfNoCredentials({req, res});
}

export default function Home() {

  return (
    <h1>Home</h1>
  );
}