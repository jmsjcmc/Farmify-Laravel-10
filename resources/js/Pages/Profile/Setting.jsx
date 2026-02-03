import { Head } from "@inertiajs/react";
import ConsumerLayout from "@/Layouts/ConsumerLayout";
import SettingsSidebar from "./Partials/SettingsSidebar";
import ProfileForm from "./Partials/ProfileForm";

export default function Settings({ auth }) {
    return (
        <>
            <Head title="Profile Settings" />

            <div className="px-6 py-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Sidebar */}
                    <SettingsSidebar />

                    {/* Content */}
                    <div className="md:col-span-3">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-semibold">
                                    Profile
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Manage your personal information
                                </p>
                            </div>

                            <ProfileForm user={auth.user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
Settings.layout = (page) => <ConsumerLayout>{page}</ConsumerLayout>
