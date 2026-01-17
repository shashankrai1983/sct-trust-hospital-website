import { Metadata } from "next";
import DashboardClient from "./dashboard-client";

// Prevent search engine indexing of dashboard pages
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  title: "Dashboard | Dr. Amita Shukla",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClient>{children}</DashboardClient>;
}
