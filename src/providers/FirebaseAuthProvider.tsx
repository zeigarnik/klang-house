// src/providers/FirebaseAuthProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState, type ReactNode, type User } from "react";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { adminDb } from "@/lib/firebase/admin"; // 서버 사이드용 아님! 클라이언트에서 쓰려면 파이어베이스 클라이언트 SDK로 프로필 가져와야 함. 여기선 인증 상태만 관리.
import { UserProfile, UserRole } from "@/types";

// 프로필 타입 (클라이언트용 최소)
interface AuthUser extends UserProfile {}

// 컨텍스트 생성
interface AuthContextType {
  user: AuthUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  role: UserRole | null;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (uid: string) => {
    // TODO: 2단계에서 Firestore에서 프로필 가져오기로 교체
    // 임시: 기본값 반환
    return {
      uid,
      email: firebaseUser?.email || "",
      displayName: firebaseUser?.displayName || "사용자",
      role: "user" as UserRole,
      stats: { totalReservations: 0, totalSpent: 0, noShowCount: 0 },
      notificationSettings: { push: true, kakaoTalk: true, sms: false, reminder1h: true, reminder1d: true },
      createdAt: new Date(),
      updatedAt: new Date(),
    } as AuthUser;
  };

  const refreshUser = async () => {
    if (firebaseUser) {
      const profile = await fetchUserProfile(firebaseUser.uid);
      setUser(profile);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const profile = await fetchUserProfile(fbUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, role: user?.role || null, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within FirebaseAuthProvider");
  return context;
}
