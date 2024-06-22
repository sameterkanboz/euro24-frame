import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as Blob;
  const country = formData.get("country") as string;

  const serverFormData = new FormData();
  serverFormData.append("file", file);
  serverFormData.append("country", country);

  const response = await axios.post(
    "http://127.0.0.1:8000/upload/",
    serverFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    }
  );

  return new NextResponse(response.data, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
