import React from 'react';
import { Card, CardBody } from '../common';
import './MetricsCard.css';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = '#2563eb',
}) => {
  return (
    <Card hoverable>
      <CardBody>
        <div className="metrics-card">
          <div className="metrics-card-header">
            <span className="metrics-card-title">{title}</span>
            {icon && (
              <span className="metrics-card-icon" style={{ color }}>
                {icon}
              </span>
            )}
          </div>
          <div className="metrics-card-value">{value}</div>
          {trend && (
            <div className={`metrics-card-trend metrics-card-trend-${trend.direction}`}>
              <span className="metrics-card-trend-icon">
                {trend.direction === 'up' ? '↑' : '↓'}
              </span>
              <span className="metrics-card-trend-value">{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
