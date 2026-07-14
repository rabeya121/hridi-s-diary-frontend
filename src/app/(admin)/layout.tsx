import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-velvet md:flex-row">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
