export async function POST(req) {
  if (!global.users) global.users = [];
  
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Please provide all required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (password.length < 6) {
      return new Response(
        JSON.stringify({ message: 'Password must be at least 6 characters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (phone && phone.length > 10) {
      return new Response(
        JSON.stringify({ message: 'Phone number must not exceed 10 digits' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existingUser = global.users.find(u => u.email === email);
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists with this email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      phone: phone || '',
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    global.users.push(newUser);

    return new Response(
      JSON.stringify({ 
        message: 'User registered successfully', 
        user: { id: newUser.id, name: newUser.name, email: newUser.email } 
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ message: 'Error registering user', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
