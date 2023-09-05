import LoginModule from "@/modules/auth/Login";
import BlankLayout from "src/shared/layouts/BlankLayout";

const Login = () => {
    return ( <LoginModule />);
}
Login.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default Login;