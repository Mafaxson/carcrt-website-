import DynamicForm from '@/components/DynamicForm';

const volunteerFields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'area', label: 'Volunteer Area', type: 'text', required: true },
  { name: 'message', label: 'Why do you want to volunteer?', type: 'textarea', required: false },
];

export default function VolunteerPage() {
  return (
    <div>
      <h1>Volunteer / Get Involved</h1>
      <DynamicForm formType="volunteer" fields={volunteerFields} />
    </div>
  );
}
