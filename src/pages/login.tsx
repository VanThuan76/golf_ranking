import LoginModule from "@/shared/modules/auth/LoginModule";
import BlankLayout from "src/shared/layouts/BlankLayout";

const Login = () => {
    return ( <LoginModule />);
}
Login.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default Login;