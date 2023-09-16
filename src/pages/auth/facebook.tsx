import RedirectFacebook from "@/src/shared/modules/auth/RedirectFacebook";
import BlankLayout from "src/shared/layouts/BlankLayout";

const PageRedirectAuthFacebook = () => {
    return ( <RedirectFacebook />);
}
PageRedirectAuthFacebook.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default PageRedirectAuthFacebook;