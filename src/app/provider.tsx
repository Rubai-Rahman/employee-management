'use client';

import { MenuProvider } from '@/components/providers/MenuProvider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  DefaultError,
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const onGlobalQueryError = (error: DefaultError, query: unknown) => {
  if (error instanceof Error) {
    console.error(
      'Global: Query failed:',
      '\nName:',
      error.name,
      '\nCause:',
      error.cause,
      '\nMessage:',
      error.message,
      '\nQuery:',
      query
    );
  } else {
    console.error('Global: Unknown query error', error);
  }
};

const onGlobalMutationError = (error: DefaultError, mutation: unknown) => {
  if (error instanceof Error) {
    console.error(
      'Global: Mutation failed:',
      '\nName:',
      error.name,
      '\nCause:',
      error.cause,
      '\nMessage:',
      error.message,
      '\nMutation:',
      mutation
    );
  } else {
    console.error('Global: Unknown mutation error', error);
  }
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({ onError: onGlobalQueryError }),
    mutationCache: new MutationCache({ onError: onGlobalMutationError }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <MenuProvider>
          <TooltipProvider delayDuration={0} disableHoverableContent>
            {children}
          </TooltipProvider>
        </MenuProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
    </QueryClientProvider>
  );
}
