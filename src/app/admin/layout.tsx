// src/app/admin/layout.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "@/components/ui/sidebar";
import { LayoutDashboard, Calendar, Building2, Users, Settings, CreditCard, TicketPercent, BarChart3, LogOut, Piano } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { name: "대시보드", href: "/admin", icon: LayoutDashboard },
  { name: "예약 관리", href: "/admin/reservations", icon: Calendar },
  { name: "공간 관리", href: "/admin/spaces", icon: Building2 },
  { name: "회원 관리", href: "/admin/users", icon: Users },
  { name: "매출/정산", href: "/admin/revenue", icon: BarChart3 },
  { name: "결제 내역", href: "/admin/payments", icon: CreditCard },
  { name: "쿠폰/프로모션", href: "/admin/coupons", icon: TicketPercent },
  { name: "설정", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 로딩 중이거나 어드민 아니면 리다이렉트 (클라이언트 사이드 가드)
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user || user.role !== "admin") return <div className="flex h-screen items-center justify-center text-gray-500">관리자 권한이 필요합니다.</div>;

  return (
    <Sidebar collapsible="icon" className="h-screen">
      <SidebarHeader>
        <Link href="/admin" className="flex h-16 items-center gap-2 px-4 font-bold text-xl text-purple-600">
          <Piano className="h-6 w-6" />
          KLANG ADMIN
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                    className={cn("data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600")}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50" onClick={() => alert("로그아웃 구현 필요")}>
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    <div className="flex-1 overflow-auto p-6 md:p-8 lg:p-12">
      {children}
    </div>
  );
}
