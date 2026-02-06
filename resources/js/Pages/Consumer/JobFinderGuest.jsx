import ConsumerLayout from "@/Layouts/ConsumerLayout";
import JobFinder from "./JobFinder";

export default function JobFinderGuest() {
    return <JobFinder/>
}

JobFinderGuest.layout = (page) => (<ConsumerLayout>{ page }</ConsumerLayout>)
