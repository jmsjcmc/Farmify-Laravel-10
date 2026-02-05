import ConsumerLayout from "@/Layouts/ConsumerLayout";
import EcommerceHome from "./EcommerceHome";

export default function EcommerceHomeGuest() {
    return <EcommerceHome/>
}

EcommerceHomeGuest.layout = (page) => (<ConsumerLayout>{page}</ConsumerLayout>)
