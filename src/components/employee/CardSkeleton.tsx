import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {[...Array(9)].map((_, index) => (
        <Card key={index} className="relative group bg-secondary">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default CardSkeleton;
