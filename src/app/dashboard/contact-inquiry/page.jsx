"use client";

import DashboardLayout from "../../../dashboard/DashboardLayout";
import ContactInquiry from "../../../dashboard/ContactInquiry";

export default function ContactInquiryPage() {
    return (
        <DashboardLayout
            pageTitle="Contact Inquiry"
            pageDescription="Manage contact requests submitted through your SoftBild website."
            activeSection="contact"
        >
            <ContactInquiry />
        </DashboardLayout>
    );
}