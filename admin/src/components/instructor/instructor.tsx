import SidebarOnly from "../../SidebarOnly";
import InstructorManagement from "./pages";

export default function Instructor () {
    return (
        <SidebarOnly>
            <InstructorManagement />
        </SidebarOnly>
    );
}