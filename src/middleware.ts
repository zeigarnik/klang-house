// src/middleware.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr"; // Supabase 아님! Firebase는 미들웨어에서 세션 쿠키 검증 필요.
// Firebase Auth는 미들웨어에서 직접 검증하려면 Admin SDK로 세션 쿠키 검증해야 함.
// 1단계에서는 **기본 구조만** 만들고, 인증 가드는 페이지 단위(클라이언트)에서 처리하거나, 
// Next.js Middleware에서 '세션 쿠키' 검증 로직을 넣는 건 2단계(서버 액션/쿠키 설정)에서 다룹니다.
// 여기서는 **경로 리다이렉트만** 처리하는 최소 버전.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 관리자 페이지 접근 시 쿠키 확인 (실제 검증은 레이아웃/페이지에서)
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("__session")?.value; // Firebase 세션 쿠키 이름
    if (!sessionCookie) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 로그인 페이지에서 이미 로그인済면 메인으로
  if (pathname.startsWith("/auth/login")) {
    const sessionCookie = request.cookies.get("__session")?.value;
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login", "/mypage/:path*"],
};
