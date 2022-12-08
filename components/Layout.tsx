import React from "react";
import Head from "next/head";
import Link from "next/link";

type Props = {
  children: any;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Flight Tracker</title>
        <meta name="description" content="Flight tracking application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-min-h-screen flex-col justify-between">
        <header className="sticky mb-4 w-full bg-transparent py-4 text-white shadow">
          <nav className="mx-4 flex h-12 items-center justify-center ">
            <div>
              <Link href="/" className=" text-3xl font-bold">
                Flight Tracker
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto text-center">{children}</main>
      </div>
    </>
  );
};

export default Layout;
