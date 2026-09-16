"use client";

import DashboardLayout from "../../../dashboard/DashboardLayout";
import { HireDevInquiry } from "../../../dashboard/HireDevInquiry";

export default function HireDevInquiryPage() {
    return (
        <DashboardLayout
            pageTitle="Hire-Dev Inquiry"
            pageDescription="Manage developer hiring requests submitted through your SoftBild website."
            activeSection="hire"
        >
            <HireDevInquiry />
        </DashboardLayout>
    );
}