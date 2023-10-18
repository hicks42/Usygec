import React, { useEffect, useState } from 'react';
import getCookie from "../getCookie";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch activities using the JWT token
    const jwtToken = getCookie("jwt_token");
    if (!jwtToken) {
      setError("Mais ou qui n'est le JWT token");
      return;
    }

    fetch('/activities/json', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`, // Include JWT token in the Authorization header
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin', // Include this to send cookies with the request
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        setActivities(data); // Update the state with the JSON data
      })
      .catch(error => {
        setError(error.message); // Handle any fetch errors
      });
  }, []);

  return (
    <div>
      <h1>Activity List</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            <strong>Name:</strong> {activity.name}<br />
            <strong>Company:</strong> {activity.company}<br />
            <strong>Due Date:</strong> {activity.dueDate}<br />
            <strong>Reminder:</strong> {activity.reminder}<br />
            <strong>Created At:</strong> {activity.createdAt}<br />
            <strong>Updated At:</strong> {activity.updatedAt}<br />
            <strong>Days to Reminder:</strong> {activity.daysToReminder}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
