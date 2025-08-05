import bcrypt from 'bcryptjs';
import { User, Role, Branch } from '../models/index.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
  try {
    const { fullName, email, password, cedula, roleId, branchId } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      cedula,
      roleId,
      branchId
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: [Role, Branch] });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        cedula: user.cedula,
        role: user.Role.name,
        branch: user.Branch.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};
