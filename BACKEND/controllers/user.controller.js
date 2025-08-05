import { User, Role, Branch, Commission, CommissionDetail } from '../models/index.js';

export const test = (req, res) => {
  res.status(200).json({ message: 'Ruta de usuario funcionando correctamente 🔥' });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Role, Branch],
      attributes: { exclude: ['password'] }
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [Role, Branch],
      attributes: { exclude: ['password'] }
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tu perfil', error: error.message });
  }
};

export const getUserCommissions = async (req, res) => {
  try {
    const { id } = req.params;

    // Si el usuario es asesor, solo puede ver su propio historial
    if (req.user.Role.name === 'Asesor Comercial' && req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: 'Acceso denegado: solo puedes ver tu propio historial' });
    }

    const commissions = await Commission.findAll({
      where: { userId: id },
      include: [CommissionDetail],
    });

    res.status(200).json(commissions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comisiones', error: error.message });
  }
};
