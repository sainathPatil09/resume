import React from 'react'
import AddInterview from './AddInterview';
import InterviewList from './InterviewList';

const InterviewDashboard = () => {
    return (
        <div className="  px-16  mt-10 space-y-3 h-full">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <p>Create and start your ai mock interview</p>
    
          <div>
            <AddInterview />
          </div>
    
          <InterviewList/>
        </div>
      );
}

export default InterviewDashboard
