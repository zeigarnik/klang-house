// src/providers/Providers.tsx
"use client";
import { QueryProvider } from "./QueryProvider";
import { FirebaseAuthProvider } from "./FirebaseAuthProvider";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <FirebaseAuthProvider>
        {children}
      </FirebaseAuthProvider>
    </QueryProvider>
  );
}
