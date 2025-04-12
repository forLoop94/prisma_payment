import cloudinary from "../utils/cloudinary.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  res.status(200).json(user);
};

export const getUsersPaginated = async (req, res) => {
  const {
    states,
    role,
    gender,
    // minAge,
    // maxAge,
    search,
    // startDate,
    // endDate,
    page = 1,
    pageSize = 3,
  } = req.query;

  const filters = {};

  // Filter by multiple states
  if (states) {
    filters.state = {
      in: states.split(","),
    };
  }

  if (role) filters.role = role;
  if (gender) filters.gender = gender;

  // Filter by age range (dateOfBirth)
  // if (minAge || maxAge) {
  //   const now = new Date();
  //   if (minAge) {
  //     const maxDOB = new Date(now.getFullYear() - parseInt(minAge), now.getMonth(), now.getDate());
  //     filters.dateOfBirth = { ...filters.dateOfBirth, lte: maxDOB };
  //   }
  //   if (maxAge) {
  //     const minDOB = new Date(now.getFullYear() - parseInt(maxAge), now.getMonth(), now.getDate());
  //     filters.dateOfBirth = { ...filters.dateOfBirth, gte: minDOB };
  //   }
  // }

  // Filter by createdAt date range
  // if (startDate || endDate) {
  //   filters.createdAt = {};
  //   if (startDate) filters.createdAt.gte = new Date(startDate as string);
  //   if (endDate) filters.createdAt.lte = new Date(endDate as string);
  // }

  // Search by name or email
  if (search) {
    filters.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  // Pagination logic
  const take = parseInt(pageSize);
  const skip = (parseInt(page) - 1) * take;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: filters,
      skip,
      take,
    }),
    prisma.user.count({ where: filters }),
  ]);

  res.json({
    data: users,
    pagination: {
      total,
      page: parseInt(page),
      pageSize: take,
      totalPages: Math.ceil(total / take),
    },
  });
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = { name, email, password, role };

    const user = await prisma.user.create({ data: newUser });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const updates = req.body;
  const { id } = req.params;
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: updates,
  });

  res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json(user);
};

export const userImageUpload = async (req, res) => {
  try {
    const fileStr = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "user_profiles",
    });

    const updatedUser = await prisma.user.update({
      where: { id: req.body.userId },
      data: { profileImage: uploadResponse.secure_url },
    });

    res.json({
      message: "Upload successful",
      imageUrl: uploadResponse.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
