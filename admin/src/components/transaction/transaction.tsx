import SidebarOnly from "../../SidebarOnly";
import TransactionManagement from "./pages";

export default function Transaction () {
    return (
        <SidebarOnly>
            <TransactionManagement />
        </SidebarOnly>
    );
}