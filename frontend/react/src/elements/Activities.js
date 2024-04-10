import React, { useEffect, useState } from "react";
import getCookie from "../getCookie";
import moment from "moment";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const jwtToken = getCookie("jwt_token");
  //   if (!jwtToken) {
  //     setError("L'authentification a échoué");
  //     return;
  //   }

  //   fetch("https://localhost/api/activities/json", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setActivities(data);
  //     })
  //     .catch((error) => {
  //       console.error("Fetch error:", error);
  //       setError(
  //         "Une erreur s'est produite lors de la récupération des activités."
  //       );
  //     });
  // }, []);

  return (
    <div>
      <h1>Activity List</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {activities.map((activity) => {
          const formattedDueDate = activity.dueDate
            ? moment(activity.dueDate.date).format("DD/MMM/YY")
            : "N/A";
          console.log(formattedDueDate);
          const formattedReminder = activity.reminder
            ? moment(activity.reminder.date).format("DD/MMM/YY")
            : "N/A";

          return (
            <li key={activity.id}>
              <strong>Name:</strong> {activity.name}
              <br />
              <strong>Company:</strong> {activity.company}
              <br />
              <strong>Due Date:</strong> {formattedDueDate}
              <br />
              <strong>Reminder:</strong> {formattedReminder}
              <br />
              <strong>Created At:</strong>{" "}
              {moment(activity.createdAt.date).format("DD/MMM/YY")}
              <br />
              <strong>Updated At:</strong>{" "}
              {moment(activity.updatedAt.date).format("DD/MMM/YY")}
              <br />
              <strong>Days to Reminder:</strong> {activity.daysToReminder}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Activities;
