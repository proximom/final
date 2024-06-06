'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';

const CustomerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  imageUrl: z.string().min(2, { message: 'Invalid URL.' }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    imageUrl?: string[];
  };
  message?: string | null;
};

export async function createCustomer(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CustomerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    imageUrl: formData.get('imageUrl'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please correct the errors and try again.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, imageUrl } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${imageUrl})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

}