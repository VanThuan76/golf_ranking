import RegisterModule from "@/modules/auth/Register";
import BlankLayout from "src/shared/layouts/BlankLayout";

const Register = () => {
    return ( <RegisterModule />);
}
Register.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default Register;