import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../Login";
import MainContent from "./MainContent";
import "./MainPage.css";
import ServerNav from "./ServerNav";

export default function MainPage({ page }) {



    return (
        <div className="MainPage-container">
            {/* <ServerNav />
            <MainContent /> */}
            <ServerNav>
                <ProtectedRoute path="/channels/@me">
                    {/* <MainContent /> */}
                </ProtectedRoute>
                {/* <ProtectedRoute path="/channels/servers/:serverId">
                    <MainContent />
                </ProtectedRoute> */}
            </ServerNav>
        </div>
    )
}

            //             <MainContent />
            //         <Route path="/channels">
            //     <Switch>
            // <ServerNav>
            //             <Route exact path="/channels/servers/2">
            //                 <Login />
            //             </Route>
            // </ServerNav>
            //     </Switch>
            //         </Route>
