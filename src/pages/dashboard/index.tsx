import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueReport } from "./components/RevenueReport";
import DashboardOverview from "./components/DashboardOverview";

export default function Dashboard() {
  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Bảng thông số</h1>
        {/* <div className="flex items-center space-x-2">
          <Button>Download</Button>
        </div> */}
      </div>
      <Tabs
        orientation="vertical"
        defaultValue="overview"
        className="space-y-4"
      >
        <div className="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview" className="space-y-4">
          <DashboardOverview />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <RevenueReport />
        </TabsContent>
      </Tabs>
    </>
  );
}
