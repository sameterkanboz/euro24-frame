"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, JSX, SVGProps, useState } from "react";
import { Icons } from "./icons";

function DownloadIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

export default function Frame() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [framedImageUrl, setFramedImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !selectedCountry) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("country", selectedCountry);

    setLoading(true);
    try {
      const response = await axios.post("/api/upload", formData, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      setFramedImageUrl(url);
      setError("");
    } catch (error) {
      setError("An error occurred while processing the image.");
      // console.error(error.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadButton = () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Euro 2024 Image Frames
          </h1>
          <p className="text-muted-foreground">
            Customize your images with official Euro 2024 frames and branding.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Select onValueChange={handleCountryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Türkiye">Türkiye</SelectItem>
                  <SelectItem value="Almanya">Almanya</SelectItem>
                  <SelectItem value="Fransa">Fransa</SelectItem>
                  <SelectItem value="İspanya">İspanya</SelectItem>
                  <SelectItem value="İtalya">İtalya</SelectItem>
                  <SelectItem value="Hollanda">Hollanda</SelectItem>
                  <SelectItem value="Portekiz">Portekiz</SelectItem>
                  <SelectItem value="Belçika">Belçika</SelectItem>

                  {/* Diğer ülkeler */}
                </SelectContent>
              </Select>
              <Input
                placeholder="Add text (optional)"
                className="px-3 py-2 rounded-md border border-muted focus:ring-0 focus:border-primary"
              />
            </div>
            <div className="flex flex-row-reverse items-center justify-between gap-4 mt-4">
              <Button
                className="w-full"
                variant={"secondary"}
                disabled={!file || !selectedCountry || loading}
              >
                {loading ? "Processing..." : "Generate Image"}
              </Button>
              <Button className="w-full" onClick={handleUploadButton}>
                <UploadIcon className="w-5 h-5 mr-2" />/
                <CameraIcon className="w-5 h-5 ml-2" />
              </Button>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </form>
        </div>
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/3]  rounded-lg">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-lg text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    <Icons.spinner className="animate-spin w-6 h-6 mr-2" />
                  </h3>
                </div>
              </div>
            ) : (
              framedImageUrl && (
                <div className="h-full w-full justify-center items-center flex flex-col gap-3">
                  <Image
                    src={framedImageUrl}
                    loading="lazy"
                    loader={({ src }) => src}
                    alt="Frame preview"
                    width={100}
                    height={100}
                    className="object-contain  w-full h-full"
                  />

                  <Button
                    disabled={!file || !selectedCountry}
                    variant={"outline"}
                  >
                    <a
                      className="flex flex-row"
                      href={framedImageUrl}
                      download="framed_image.png"
                    >
                      <DownloadIcon className="w-5 h-5 mr-2" />
                      Download{" "}
                    </a>
                  </Button>
                </div>
              )
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {!framedImageUrl && !file && !loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-lg text-center">
                  <h3 className="text-2xl font-bold mb-2">Preview</h3>
                  <p className="text-muted-foreground">
                    See how your image will look with the selected frame.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
