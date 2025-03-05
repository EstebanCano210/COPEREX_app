import Admin from '../src/user/admin.model.js';
import argon2 from 'argon2';

export const initializeAdmin = async () => {
  try {
    
    const adminExists = await Admin.findOne({ role: 'ADMIN_ROLE' });
    const usernameExists = await Admin.findOne({ username: 'admin' });

    if (adminExists || usernameExists) {
      console.log('⚠️ Ya existe un administrador o el username "admin" está en uso. No se creará otro.');
      return;
    }

    
    const hashedPassword = await argon2.hash('l@_contra');
    const admin = new Admin({
      name: 'Administrador', 
      username: 'admin',
      email: 'ecano@gmail.com',
      password: hashedPassword,
      role: 'ADMIN_ROLE',
    });

    await admin.save();
    console.log('✅ Administrador creado automáticamente:', admin);
  } catch (error) {
    console.error('❌ Error al crear el administrador:', error);
  }
};
