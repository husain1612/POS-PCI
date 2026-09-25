import React, { createContext, useContext, useMemo, useState } from "react";
import { SyncQueueItem } from "@/types";
import { generateId } from "@/utils/id";

interface QueueInput {
  transactionId: string;
  transactionNumber: string;
  amount: number;
}

interface OfflineContextValue {
  isOnline: boolean;
  setOnline: (online: boolean) => void;
  toggleOnline: () => void;
  queue: SyncQueueItem[];
  enqueue: (input: QueueInput) => void;
  syncAll: () => Promise<void>;
  retryOne: (id: string) => Promise<void>;
  isSyncing: boolean;
  registerSyncedHandler: (handler: (transactionId: string) => void) => void;
}

const OfflineContext = createContext<OfflineContextValue | undefined>(undefined);

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [queue, setQueue] = useState<SyncQueueItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const syncedHandlerRef = React.useRef<((transactionId: string) => void) | undefined>(undefined);

  const setOnline = (online: boolean) => setIsOnline(online);
  const toggleOnline = () => setIsOnline((v) => !v);

  const enqueue = (input: QueueInput) => {
    const item: SyncQueueItem = {
      id: generateId("sync"),
      transactionId: input.transactionId,
      transactionNumber: input.transactionNumber,
      amount: input.amount,
      status: "pending",
      retryCount: 0,
      createdAt: new Date().toISOString(),
    };
    setQueue((prev) => [item, ...prev]);
  };

  const registerSyncedHandler = (handler: (transactionId: string) => void) => {
    syncedHandlerRef.current = handler;
  };

  const syncOne = async (item: SyncQueueItem): Promise<boolean> => {
    setQueue((prev) => prev.map((q) => (q.id === item.id ? { ...q, status: "syncing" } : q)));
    await new Promise((resolve) => setTimeout(resolve, 900));
    const succeeded = isOnline;
    setQueue((prev) =>
      prev.map((q) =>
        q.id === item.id
          ? {
              ...q,
              status: succeeded ? "synced" : "failed",
              retryCount: succeeded ? q.retryCount : q.retryCount + 1,
            }
          : q
      )
    );
    if (succeeded) syncedHandlerRef.current?.(item.transactionId);
    return succeeded;
  };

  const syncAll = async () => {
    if (!isOnline) return;
    setIsSyncing(true);
    const pending = queue.filter((q) => q.status === "pending" || q.status === "failed");
    for (const item of pending) {
      // eslint-disable-next-line no-await-in-loop
      await syncOne(item);
    }
    setIsSyncing(false);
  };

  const retryOne = async (id: string) => {
    const item = queue.find((q) => q.id === id);
    if (!item) return;
    setIsSyncing(true);
    await syncOne(item);
    setIsSyncing(false);
  };

  const value = useMemo<OfflineContextValue>(
    () => ({
      isOnline,
      setOnline,
      toggleOnline,
      queue,
      enqueue,
      syncAll,
      retryOne,
      isSyncing,
      registerSyncedHandler,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOnline, queue, isSyncing]
  );

  return <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>;
}

export function useOffline(): OfflineContextValue {
  const ctx = useContext(OfflineContext);
  if (!ctx) throw new Error("useOffline must be used within an OfflineProvider");
  return ctx;
}
