import React, { useState, ReactNode } from "react";

type Routes = {
    [key: string]: ReactNode;
};

const Router: React.FC<{ routes: Routes; defaultRoute: string }> = ({ routes, defaultRoute }) => {
    const [currentRoute, setCurrentRoute] = useState<string>(defaultRoute);

    const navigate = (route: string) => {
        if (routes[route]) {
            setCurrentRoute(route);
        }
    };

    return (
        <div>
            {routes[currentRoute]}
            {/* Provide navigation context */}
            <div style={{ display: "none" }}>
                {Object.keys(routes).map((route) => (
                    <button
                        key={route}
                        onClick={() => navigate(route)}
                        id={`navigate-${route}`}
                        hidden
                    />
                ))}
            </div>
        </div>
    );
};

export default Router;
