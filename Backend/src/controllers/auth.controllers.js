import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { UserRoleModel } from "../models/user_role.model.js";
import { generateToken } from "../utils/jwt.util.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({
    where: { username, password },
    include: {
      model: PersonModel,
      attributes: ["name", "lastname"],
      as: "person",
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  const token = generateToken({
    id: user.id,
    name: user.person.name,
    lastname: user.person.lastname,
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1h
    sameSite: "lax",
    // secure: true, // habilitar en producción
  });
  return res.json({ message: "Login exitoso" });
};

export const register = async (req, res) => {
  try {
    const { name, lastname, username, email, password } = req.body;
    const persona = await PersonModel.create({ name, lastname });
    const user = await UserModel.create({
      username,
      email,
      password,
      person_id: persona.dataValues.id,
    });
    // Asignar role 'user' por defecto
    let roleUser = await UserRoleModel.findOne({ where: { role_id: 2 } });
    let roleId = 2;
    if (!roleUser) {
      // Si no existe el rol, lo creamos en la tabla de roles y user_roles
      const { RoleModel } = await import("../models/role.model.js");
      let userRole = await RoleModel.findOne({ where: { rolename: "user" } });
      if (!userRole) {
        userRole = await RoleModel.create({ rolename: "user" });
      }
      roleId = userRole.id;
    }
    await UserRoleModel.create({ user_id: user.id, role_id: roleId });
    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

export const profile = (req, res) => {
  return res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      lastname: req.user.lastname,
    },
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  return res.json({ message: "Logout exitoso" });
};
