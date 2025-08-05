import SidebarOnly from "../../../SidebarOnly";
import ToolsManagement from "./toolspage";

export default function Tools () {
    return (
        <SidebarOnly>   
            <ToolsManagement />
        </SidebarOnly>
    );
}