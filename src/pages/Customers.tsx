import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCustomers } from "@/data/mockData";
import { Users, Phone, UserPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Customers() {
  const totalDebt = mockCustomers.reduce((s, c) => s + c.balance, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-sm text-muted-foreground">
            {mockCustomers.length} customers • Outstanding: KES {totalDebt.toLocaleString()}
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Balance (KES)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCustomers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    {c.name}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{c.phone}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {c.balance > 0 ? (
                      <span className="text-destructive">{c.balance.toLocaleString()}</span>
                    ) : (
                      <span className="text-success">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {c.balance > 0 ? (
                      <Badge variant="destructive">Owes</Badge>
                    ) : (
                      <Badge variant="outline" className="text-success border-success">Clear</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
