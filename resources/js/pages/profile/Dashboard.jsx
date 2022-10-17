import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="card shadow rounded-4 border-0">
            <div className="card-header bg-white  rounded-3 py-3 px-4">
                <h5 className="mb-0 text-dark">Dashboard</h5>
            </div>
            <div className="card-body p-4">
                <div className="row gy-3">
                    <div className="col-sm-4 col-xl-3">
                        <img
                            src={
                                user.picture
                                    ? user.picture
                                    : "/assets/images/profile-placeholder.jpg"
                            }
                            className="img-fluid w-100 rounded-circle"
                            alt=""
                        />
                    </div>
                    <div className="col-sm-8 col-xl-9">
                        <h3 className="fw-bold mb-0">
                            {user.first_name} {user.last_name}
                        </h3>
                        <p>
                            @ <a href={"mailto:" + user.email}>{user.email}</a>
                        </p>
                        {user.bio ? (
                            <p>{user.bio}</p>
                        ) : (
                            <p className="text-muted user-select-none">
                                [You should write bio about you so that others
                                can know about you and your knowledge.]
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
