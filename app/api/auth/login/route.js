import jwt from 'jsonwebtoken';

export async function POST(req) {
  if (!global.users) global.users = [];
  
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Please provide email and password' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = global.users.find(u => u.email === email);
    
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (password !== user.password) {
      return new Response(
        JSON.stringify({ message: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'demo-secret-key',
      { expiresIn: '7d' }
    );

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        token,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ message: 'Error logging in', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
