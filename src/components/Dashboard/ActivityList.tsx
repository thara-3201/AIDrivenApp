import React from 'react';
import { Activity } from '../../types/api.types';
import { Card, CardHeader, CardBody } from '../common';
import './ActivityList.css';

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    
    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInMins < 1440) return `${Math.floor(diffInMins / 60)}h ago`;
    return `${Math.floor(diffInMins / 1440)}d ago`;
  };

  return (
    <Card>
      <CardHeader>Recent Activity</CardHeader>
      <CardBody>
        <div className="activity-list">
          {activities.length === 0 ? (
            <div className="activity-empty">No recent activity</div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-item-content">
                  <div className="activity-item-type">{activity.type}</div>
                  <div className="activity-item-description">{activity.description}</div>
                  {activity.user && (
                    <div className="activity-item-user">by {activity.user.name}</div>
                  )}
                </div>
                <div className="activity-item-time">{formatTime(activity.timestamp)}</div>
              </div>
            ))
          )}
        </div>
      </CardBody>
    </Card>
  );
};
