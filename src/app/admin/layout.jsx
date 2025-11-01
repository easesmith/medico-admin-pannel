import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-accent/20">
        <AppHeader />
        <main className="px-5 py-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
