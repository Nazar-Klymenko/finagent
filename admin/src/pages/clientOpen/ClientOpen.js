import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getApplicationsForUserAPI, getSpecificClientAPI } from "@api/mainAPI";

import ApplicationCard from "@components/ApplicationCard";
import { BackArrow } from "@components/buttons";
import { FullPage } from "@components/content";
import InfoCell from "@components/InfoCell";

const ClientOpen = () => {
  let { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const users = await getSpecificClientAPI(id);
        const applications = await getApplicationsForUserAPI(id);

        setUser(users.data.user);
        setApplications(applications.data.ApplicationList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const registeredAt = new Date(user.createdAt).toLocaleDateString("pl");
  const fullName = user.name + " " + user.surname;

  return (
    <FullPage>
      {!isLoading && (
        <div className="application-open">
          <div className="application-open__header">
            <BackArrow returnTo="/clients/" />
            <div className="application-open__info">
              <InfoCell name="Name" value={fullName} />
              <InfoCell name="Registered At" value={registeredAt} />
            </div>
          </div>
          <div className="application-open__body">
            {applications.length === 0 && (
              <h2>This user doesn't have any applications</h2>
            )}
            {applications &&
              applications.map((app) => (
                <ApplicationCard appDataForUser={app} />
              ))}
          </div>
        </div>
      )}
    </FullPage>
  );
};

export default ClientOpen;
