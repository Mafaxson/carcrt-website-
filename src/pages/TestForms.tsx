import React from "react";
import ContactForm from "@/components/ContactForm";
import VolunteerForm from "@/components/VolunteerForm";
import DonationForm from "@/components/DonationForm";

export default function TestForms() {
  return (
    <div className="p-8 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
        <ContactForm />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Volunteer Form</h2>
        <VolunteerForm />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Donation Form</h2>
        <DonationForm />
      </section>
    </div>
  );
}
