// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Piano, Music, Calendar, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Hero */}
        <section className="space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
            🎉 Setup Complete! Next.js 14 + Firebase + Shadcn/UI
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            KLANG <span className="text-purple-600">HOUSE</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            소리의 울림을 담는 공간. 최상급 그랜드 피아노와 완벽한 방음, 당신의 연습과 공연을 위한 최적의 환경.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/login"><Button size="lg" className="w-full sm:w-auto gap-2"><Calendar className="h-4 w-4" /> 연습실 예약하기</Button></Link>
            <Link href="/admin" variant="outline"><Button size="lg" className="w-full sm:w-auto"><Music className="h-4 w-4" /> 관리자 페이지</Button></Link>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 text-left">
          <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Piano className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>최상급 피아노</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">야마하/스타인웨이 그랜드 피아노 상시 비치, 정기 조율 관리</CardContent>
          </Card>
          <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Music className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>아트홀 & 녹음</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">공연장 대관, 전문 녹음/영상 장비 지원, 라이브 스트리밍 가능</CardContent>
          </Card>
          <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>스마트 예약</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">모바일 앱으로 실시간 예약, QR 입장, 자동 알림, 정기 결제까지 한 번에</CardContent>
          </Card>
        </section>

        <footer className="text-gray-400 text-sm pt-8 border-t border-gray-200">
          © {new Date().getFullYear()} KLANG HOUSE. Built with Next.js & Firebase.
        </footer>
      </div>
    </main>
  );
}
"// test" 
"// test" 
