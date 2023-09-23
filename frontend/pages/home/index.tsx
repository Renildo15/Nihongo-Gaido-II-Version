import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "@/utils";

import { HomeDefaultPage } from "@/components/home/HomeDefaultPage";


export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
  return redirectIfNoCredentials({req, res});
}

export default function Home() {

  return (
    <HomeDefaultPage title="Home">
       
    </HomeDefaultPage>
        
  );
}