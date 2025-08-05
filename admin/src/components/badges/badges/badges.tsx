import SidebarOnly from "../../../SidebarOnly";
import BadgesManagement from "./pages";

export default function Badges () {
    return (
        <SidebarOnly>
            <BadgesManagement />
        </SidebarOnly>
    );
}