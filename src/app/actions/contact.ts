"use server";



export type ContactState = {
    success?: boolean;
    error?: string;
    fieldErrors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};

export async function sendContactEmail(prevState: ContactState, formData: FormData): Promise<ContactState> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Simple validation
    if (!name || name.length < 2) {
        return { error: "Name is too short" };
    }
    if (!email || !email.includes("@")) {
        return { error: "Invalid email" };
    }
    if (!message || message.length < 10) {
        return { error: "Message is too short" };
    }

    console.log("Contact form submission:", { name, email, message });

    // In a real app, you'd use Resend, Nodemailer, etc.
    // For now, we simulate success
    return { success: true };
}
