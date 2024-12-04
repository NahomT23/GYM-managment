"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "react-countup";

interface DashboardProps {
  totalRevenue: number;
  totalMembers: number;
  totalEmployes: number;
  activeMembers: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  totalRevenue,
  totalMembers,
  totalEmployes,
  activeMembers
}) => {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-950">
      <div className="p-4 grid gap-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Reduced gap to 4 */}
          
          {/* Card 1: Total Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp start={0} end={totalRevenue} duration={2.5} decimals={2} prefix="$" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
            </CardContent>
          </Card>

          {/* Card 2: Total Members */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp start={0} end={totalMembers} duration={2.5} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+15.4% from last month</p>
            </CardContent>
          </Card>

          {/* Card 3: Total Employees */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp start={0} end={totalEmployes} duration={2.5} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">no change from last month</p>
            </CardContent>
          </Card>

          {/* Card 4: Active Members */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <CountUp start={0} end={activeMembers} duration={2.5} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">-2.5% from last month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
