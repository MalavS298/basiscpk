import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Inbox, 
  Clock, 
  Newspaper, 
  BarChart3,
  FileText
} from "lucide-react";

type TabType = "submit" | "pending" | "all" | "users" | "newsletters" | "statistics";

interface DashboardSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isAdmin: boolean;
  pendingCount?: number;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: number;
}

const DashboardSidebar = ({ activeTab, setActiveTab, isAdmin, pendingCount = 0 }: DashboardSidebarProps) => {
  const userNavItems: NavItem[] = [
    { id: "submit", label: "Overview", icon: LayoutDashboard },
  ];

  const adminNavItems: NavItem[] = [
    { id: "submit", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "pending", label: "Hours Inbox", icon: Inbox, badge: pendingCount },
    { id: "statistics", label: "Statistics", icon: BarChart3 },
    { id: "newsletters", label: "Newsletters", icon: Newspaper },
    { id: "all", label: "All Submissions", icon: FileText },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className="w-64 min-h-screen border-r border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h2 className="text-xl font-bold text-primary font-display">Dashboard</h2>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <span className="ml-auto w-2 h-2 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
