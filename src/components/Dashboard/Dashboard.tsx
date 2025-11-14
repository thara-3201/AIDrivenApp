import React, { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { dataService } from '../../services/data.service';
import { Loading, ErrorMessage, Button } from '../common';
import { MetricsCard } from './MetricsCard';
import { ActivityList } from './ActivityList';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { data, loading, error, refetch } = useFetch(
    () => dataService.getDashboardData(),
    []
  );

  if (loading) {
    return <Loading fullScreen message="Loading dashboard..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error.message}
        onRetry={refetch}
        fullScreen
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <Button onClick={refetch} variant="outline">
          Refresh
        </Button>
      </div>

      <div className="dashboard-metrics">
        <MetricsCard
          title="Total Users"
          value={data.metrics.totalUsers.toLocaleString()}
          icon="👥"
          color="#2563eb"
          trend={{ value: 12.5, direction: 'up' }}
        />
        <MetricsCard
          title="Total Revenue"
          value={`$${data.metrics.totalRevenue.toLocaleString()}`}
          icon="💰"
          color="#059669"
          trend={{ value: 8.2, direction: 'up' }}
        />
        <MetricsCard
          title="Active Products"
          value={data.metrics.activeProducts}
          icon="📦"
          color="#7c3aed"
        />
        <MetricsCard
          title="Pending Orders"
          value={data.metrics.pendingOrders}
          icon="🛒"
          color="#dc2626"
          trend={{ value: 3.1, direction: 'down' }}
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-activity">
          <ActivityList activities={data.recentActivity} />
        </div>
      </div>
    </div>
  );
};
