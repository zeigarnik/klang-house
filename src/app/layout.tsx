// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Providers } from "@/providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KLANG HOUSE | 피아노 연습실 & 아트홀 대관",
    template: "%s | KLANG HOUSE",
  },
  description: "최상급 그랜드 피아노와 완벽한 방음. 피아노 연습실, 레슨실, 아트홀 대관을 지금 예약하세요.",
  keywords: ["피아노연습실", "아트홀대관", "그랜드피아노", "방음연습실", "피아노레슨", "KLANG"],
  authors: [{ name: "KLANG HOUSE" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "KLANG HOUSE",
    title: "KLANG HOUSE | 피아노 연습실 & 아트홀 대관",
    description: "소리의 울림을 담는 공간, 클랑하우스",
    images: ["/og-image.png"], // 추후 public 폴더에 이미지 넣기
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#6D28D9", // Primary 색상
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-pretendard">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
