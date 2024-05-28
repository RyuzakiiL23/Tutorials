'use client';
import { useSession } from "next-auth/react";
import React from 'react'

export default function ProtectedRoutes() {
const { data: session } = useSession();
if (!session) {
  return (false);
}
return true;
}