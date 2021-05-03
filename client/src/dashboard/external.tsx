import { addStyle } from "../utility";

const AddExternal = () => {
    // let urls = [
    //     "/web/css/bootstrap.min.css",
    //     "/web/fonts/line-icons.css",
    //     "/web/css/slicknav.css",
    //     "/web/css/color-switcher.css",
    //     "/web/css/animate.css",
    //     "/web/css/owl.carousel.css",
    //     "/web/css/main.css",
    //     "/web/css/responsive.css",
    // ]
    let urls = [
        // "/assets/fonts/MaterialDesign/css/materialdesignicons.min.css",
        // "/assets/vendors/perfect-scrollbar/perfect-scrollbar.css",
        // "/assets/vendors/OwlCarousel2/owl.carousel.css",
        // "/assets/vendors/bootstrap/bootstrap.min.css",
        "/css/app.css",
        // "/css/theme/default.css",
    ]

    let scripts = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]

    urls.forEach(u => {
        addStyle(u);
    })
    return (<></>)
}


export default AddExternal;