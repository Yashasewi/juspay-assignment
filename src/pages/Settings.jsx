export default function Settings() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-muted/50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">
                        Profile Settings
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">
                                Display Name
                            </label>
                            <div className="mt-1 p-2 bg-background rounded border">
                                John Doe
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <div className="mt-1 p-2 bg-background rounded border">
                                john.doe@example.com
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-muted/50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">
                                Language
                            </label>
                            <div className="mt-1 p-2 bg-background rounded border">
                                English (US)
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">
                                Timezone
                            </label>
                            <div className="mt-1 p-2 bg-background rounded border">
                                UTC-5 (Eastern Time)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
