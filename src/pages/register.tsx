import RegisterModule from "@/shared/modules/auth/RegisterModule";
import BlankLayout from "src/shared/layouts/BlankLayout";

const Register = () => {
    return ( <RegisterModule />);
}
Register.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default Register;