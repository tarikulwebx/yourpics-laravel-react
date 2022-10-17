import React from "react";
import { Outlet } from "react-router-dom";

import ProfileNavigation from "../../components/profile/navigation/ProfileNavigation";

const Profile = () => {
    return (
        <section className="py-4 my-2 px-sm-2">
            <div className="container-xl">
                <div className="row gy-4">
                    <div className="col-12">
                        <ProfileNavigation />
                    </div>
                    <div className="col-12">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
