import React from "react";
import Head from "next/head";
import Link from "next/link";

type Props = {
  title: string;
  children: any;
};

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - Flight Tracker" : "Flight Tracker"}</title>
        <meta name="description" content="Flight tracking application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-min-h-screen flex-col justify-between">
        <header className="sticky mb-4 w-full bg-white shadow">
          <nav className="mx-4 flex h-12 items-center justify-between ">
            <div>
              <Link href="/" className=" text-lg font-bold">
                Flight Tracker
              </Link>
            </div>
            <div>
              <Link href="/tracker" className="">
                Tracker
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
