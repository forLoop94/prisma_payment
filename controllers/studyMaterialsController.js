import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMaterials = async (req, res) => {
  const materials = await prisma.studyMaterials.findMany();
  res.status(200).json(materials);
};

export const getMaterial = async (req, res) => {
  const { id } = req.params;

  const material = await prisma.studyMaterials.findFirst({
    where: {
      id: id,
    },
  });

  if (!material) res.status(404).json({ message: "Material not found" });

  res.status(200).json(material);
};
