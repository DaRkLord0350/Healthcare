import db from "@/lib/db";

export async function getMedicalRecords({ page, limit, search }) {
  try {
    const PAGE_NUMBER = Number(page) <= 0 ? 1 : Number(page);
    const LIMIT = Number(limit) || 10;
    const SKIP = (PAGE_NUMBER - 1) * LIMIT;

    const where = search
      ? {
          OR: [
            {
              patient: {
                first_name: { contains: search, mode: "insensitive" },
              },
            },
            {
              patient: {
                last_name: { contains: search, mode: "insensitive" },
              },
            },
            { patient_id: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [data, totalRecords] = await Promise.all([
      db.medicalRecords.findMany({
        where,
        include: {
          patient: {
            select: {
              first_name: true,
              last_name: true,
              date_of_birth: true,
              img: true,
              colorCode: true,
              gender: true,
            },
          },
          diagnosis: {
            include: {
              doctor: {
                select: {
                  name: true,
                  specialization: true,
                  img: true,
                  colorCode: true,
                },
              },
            },
          },
          lab_test: true,
        },
        skip: SKIP,
        take: LIMIT,
        orderBy: { created_at: "desc" },
      }),
      db.medicalRecords.count({ where }),
    ]);

    const totalPages = Math.ceil(totalRecords / LIMIT);

    return {
      success: true,
      data,
      totalRecords,
      totalPages,
      currentPage: PAGE_NUMBER,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
    };
  }
}
