import DynamicForm from '@/components/DynamicForm';

const donationFields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'amount', label: 'Donation Amount', type: 'number', required: true },
  { name: 'message', label: 'Message', type: 'textarea', required: false },
];

export default function DonationPage() {
  return (
    <div>
      <h1>Donate</h1>
      <DynamicForm formType="donation" fields={donationFields} />
    </div>
  );
}
