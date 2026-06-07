import { ReactNode } from 'react';
import { DashboardHeader } from '@/components/Dashboard/Header';
import { Navbar } from '@/components/Dashboard/Navbar';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section classNam