import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F6F7F8]">
        <AppHeader />
        <main className="px-10 py-5 ">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
