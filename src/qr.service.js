import { pool } from "./db.js";

export const getQR = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * from fn_getqr()");

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron códigos QR" });
        }

        return res.status(200).json({
            data: resultado.rows.map((row) => ({
                id: row.id,
                data: row.data,
            })),
            type: "qr",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los códigos QR" });
    }
}


export const getQR_id = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query("SELECT * from fn_getqr_id($1)", [
      id,
    ]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Código QR no encontrado" });
    }

    return res.status(200).json({
      id: resultado.rows[0].id,
      data: resultado.rows[0].data,
      type: "qr",
    });
  } catch (error) {
    console.error("Error al obtener el código QR:", error);
    res
      .status(500)
      .json({ error: "Error al obtener el código QR", error: error.message });
  }
};

export const createQr = async (req, res) => {
  const { data } = req.body;

  try {
    if (!data) {
      return res.status(400).json({ message: "Data is required" });
    }

    const result = await pool.query("SELECT * FROM fn_createqr($1)", [data]);

    return res.status(201).json({
      id: result.rows[0].fn_addqr,
    });
  } catch (error) {
    console.error("Error creating QR code:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const deleteQr = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await pool.query("SELECT * FROM fn_deleteqr($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "QR code not found" });
    }

    return res.status(200).json({
      message: "QR code deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting QR code:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};