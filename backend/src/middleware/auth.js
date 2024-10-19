import bcrypt from 'bcrypt';

async function hashPassword(password) {
  try {
    const SALT = 12;
    const salt = await bcrypt.genSalt(SALT);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error(err.message); 
  }
}

export const auth = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hash = await hashPassword(password);

    req.body.password = hash;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
