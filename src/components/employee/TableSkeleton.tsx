'use client';
import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TableSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(9)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[150px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8" /> {/* Previous button */}
          <Skeleton className="h-8 w-8" /> {/* Page 1 */}
          <Skeleton className="h-8 w-8" /> {/* Page 2 */}
          <Skeleton className="h-8 w-8" /> {/* Page 3 */}
          <Skeleton className="h-8 w-8" /> {/* Next button */}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
