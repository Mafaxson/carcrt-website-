export type FormSubmission = {
  id: string;
  form_type: string;
  fields: Record<string, any>;
  submitted_at: string;
  email?: string;
};

export type DynamicContent = {
  id: string;
  section: string;
  content: Record<string, any>;
  updated_at: string;
};

export type News = {
  id: string;
  title: string;
  body: string;
  published_at: string;
  image_url?: string;
};

export type Event = {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  image_url?: string;
};
