import { $ } from "@wdio/globals";
import Page from "./page.js";

class SemaglutideProductDetail extends Page {

public get semaglutideProductMenu() {
    return $(
      "//a[@class='Header_dropdown-link__I_m0B ' and text()='GLP-1 Semaglutide']"
    );
}
}
export default new SemaglutideProductDetail();
