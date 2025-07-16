import SidebarOnly from "../../SidebarOnly";
import AddInstructorForm from "./CreateForm";

export default function Instructor () {
    return (
        <SidebarOnly>
            <AddInstructorForm />
        </SidebarOnly>
    );
}