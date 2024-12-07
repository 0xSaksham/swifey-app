import React, { createContext, useContext, useState } from 'react';

interface Connection {
  userId: string;
  connectedUserId: string;
  stakeAmount: number;
  isStaked: boolean;
  chatHistoryEnabled: boolean;
}

interface ConnectionContextType {
  connections: Connection[];
  addConnection: (connection: Connection) => void;
  removeConnection: (userId: string, connectedUserId: string) => void;
  updateChatPreference: (userId: string, connectedUserId: string, enabled: boolean) => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export default function ConnectionProvider({ children }: { children: React.ReactNode }) {
  const [connections, setConnections] = useState<Connection[]>([]);

  const addConnection = (connection: Connection) => {
    setConnections(prev => [...prev, connection]);
  };

  const removeConnection = (userId: string, connectedUserId: string) => {
    setConnections(prev =>
      prev.filter(conn =>
        !(conn.userId === userId && conn.connectedUserId === connectedUserId) &&
        !(conn.userId === connectedUserId && conn.connectedUserId === userId)
      )
    );
  };

  const updateChatPreference = (userId: string, connectedUserId: string, enabled: boolean) => {
    setConnections(prev =>
      prev.map(conn => {
        if ((conn.userId === userId && conn.connectedUserId === connectedUserId) ||
          (conn.userId === connectedUserId && conn.connectedUserId === userId)) {
          return { ...conn, chatHistoryEnabled: enabled };
        }
        return conn;
      })
    );
  };

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        addConnection,
        removeConnection,
        updateChatPreference
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnections() {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnections must be used within a ConnectionProvider');
  }
  return context;
}
